import Order from '../../models/Order.js'
import Subscription from '../../models/Subscription.js'
import Meal from '../../models/Meal.js'

const orderResolvers = {

    OrderStatus: {
        ACTIVED: "Actived",
        ORDERED: "Ordered",
        DELIVERED: "Delivered"
    },

    TimeSlot: {
        MORNING: "09:30 - 13:30",
        EVENING: "16:00 - 22:00"
    },

    Query: {
        getAllOrders: async () => await Order.find(),

        getOneOrder: async (_, { orderID }) => await Order.findById(orderID).populate('meals.mealID'),

        getNextOrders: async () => await Order.find({ status: 'Ordered' }).populate('meals.mealID'),

        getMyActiveOrder: async (_, args, { currentUser }) => {
            const { _id } = currentUser

            const subs = await Subscription.findOne({ user: _id })
            const activeOrder = await Order.findOne({ subscription: subs._id, status: 'Actived' }).populate('meals.mealID')

            return activeOrder
        },

        getMyNextOrder: async (_, args, { currentUser }) => {
            const { _id } = currentUser

            const subs = await Subscription.findOne({ user: _id })
            const orderedOrder = await Order.findOne({ subscription: subs._id, status: 'Ordered' }).populate('meals.mealID')

            return orderedOrder
        },

        getMyDeliveredOrders: async(_, args, {currentUser}) => {
            const { _id } = currentUser

            const subs = await Subscription.findOne({ user: _id })
            const deliveredOrders = await Order.find({ subscription: subs._id, status: 'Delivered' }).populate('meals.mealID')

            return deliveredOrders
        }
    },

    Mutation: {
        createOrder: async (_, args) => {

            const { subscriptionID } = args
            const subscription = await Subscription.findById(subscriptionID)

            // DELIVERY DATE

            const subs = await Subscription.findById(subscriptionID)
            const { deliveryWeekDay } = subs

            if (deliveryWeekDay === 0) deliveryWeekDay = 7

            const todayDate = new Date()  // ---> 2022-09-02...
            const todayWeekDay = todayDate.getDay() // ---> 5 === viernes

            let daysToDeliver = deliveryWeekDay - todayWeekDay

            if (daysToDeliver < 0) daysToDeliver = 7 + daysToDeliver

            const deliveryDate = new Date(todayDate.setDate(todayDate.getDate() + daysToDeliver))


            // BASE MENU
            if (!subscription.baseMenu) {

                const order = new Order({ subscription: subscriptionID, deliveryDate: { day: deliveryDate } })
                return order.save()

            } else {

                const mealCategorys = Object.entries(subscription.baseMenu.meals.perCategory)

                let meals = await Promise.all(mealCategorys.map(async ([key, value]) => {
                    return await Meal.aggregate([{ $match: { category: key, currentlyInMenu: true } }, { $sample: { size: value } }])
                }))

                meals = meals.flat()

                const mealIDs = meals.map(meal => {
                    return {
                        mealID: meal._id,
                        quantity: 1
                    }
                })

                const order = new Order({ subscription: subscriptionID, meals: mealIDs })
                return order.save()
            }
        },

        addMealToOrder: async (_, args) => {

            const { orderID, mealID } = args

            const order = await Order.findById(orderID)

            if (order.status !== 'Actived') return // lanzar un error. No se puede modificar un pedido si está 'ordered' o 'delivered'

            const mealIsInOrder = order.meals.find(meal => meal.mealID == mealID)

            if (mealIsInOrder) mealIsInOrder.quantity++
            else order.meals.push({ mealID, quantity: 1 })

            order.save()
            return order.meals
        },

        removeMealFromOrder: async (_, args) => {
            const { orderID, mealID } = args

            const order = await Order.findById(orderID)

            if (order.status !== 'Actived') return // lanzar un error. No se puede modificar un pedido si está 'ordered' o 'delivered'

            const meal = order.meals.find(meal => meal.mealID == mealID)
            const mealIndex = order.meals.indexOf(meal)

            if (meal.quantity > 1) meal.quantity--
            else if (meal.quantity === 1) order.meals.splice(mealIndex, 1)

            order.save()
            return order.meals
        },

        updateOrderPrice: async (_, args) => {
            const { orderID } = args

            const order = await Order.findById(orderID).populate('meals.mealID')

            let price = 0

            order.meals.forEach(meal => {
                price += (meal.mealID.price * meal.quantity)
            })

            order.price = parseFloat(price.toFixed(2))

            return order.save()
        },

        updateDeliveryDate: async (_, args) => {
            const { orderID, deliveryDate } = args

            const order = await Order.findById(orderID)
            order.deliveryDate = deliveryDate

            return order.save()

        },

        confirmOrder: async (_, args) => {
            const { orderID } = args

            const order = await Order.findById(orderID)
            order.status = 'Ordered'

            return order.save()
        }
    }
}

export default orderResolvers