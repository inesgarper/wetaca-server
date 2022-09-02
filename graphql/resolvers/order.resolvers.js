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

        getActiveOrders: async (_, args, { currentUser }) => {
            const { _id } = currentUser

            // Encontrar las suscripciones de un usuario y guardar sus ids
            const subs = (await Subscription.find({ user: _id })).map(elm => elm._id)

            // Para cada id_suscripción encontrar los orders activos
            const activeOrders = await Promise.all(subs.map(async (sub) => {
                return await Order.findOne({ subscription: sub, status: 'Actived' }).populate('meals.mealID')
            }))

            return activeOrders
        },

        getNextOrders: async () => await Order.find({ status: 'Ordered' }).populate('meals.mealID'),

        getMyNextOrder: async (_, args, { currentUser }) => {
            const { _id } = currentUser

            // Encontrar las suscripciones de un usuario y guardar sus ids
            const subs = (await Subscription.find({ user: _id })).map(elm => elm._id)

            // Para cada id_suscripción encontrar los orders ordered
            const orderedOrder = await Promise.all(subs.map(async (sub) => {
                return await Order.findOne({ subscription: sub, status: 'Ordered' }).populate('meals.mealID')
            }))

            return orderedOrder
        }
    },

    Mutation: {
        createOrder: async (_, args) => {

            const { subscriptionID } = args
            const subscription = await Subscription.findById(subscriptionID)

            if (!subscription.baseMenu) {

                const order = new Order({ subscription: subscriptionID })
                return await order.save()

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
                await order.save()

                return await Order.findById(order._id).populate('meals.mealID')
            }
        },

        addMealToOrder: async (_, args) => {

            const { orderID, mealID } = args

            const order = await Order.findById(orderID).populate('meals.mealID')

            if (order.status !== 'Actived') return // lanzar un error. No se puede modificar un pedido si está 'ordered' o 'delivered'

            const mealIsInOrder = order.meals.find(meal => meal.mealID == mealID)

            if (mealIsInOrder) mealIsInOrder.quantity++
            else order.meals.push({ mealID, quantity: 1 })

            await order.save()
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

            return await order.save()
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

// // Encontrar la suscripción para sacar el día de entrega de preferencia

// const subs = await Subscription.findById(order.subscription)
// const { deliveryWeekDay } = subs

// console.log(deliveryWeekDay)