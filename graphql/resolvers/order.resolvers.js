import Order from '../../models/Order.js'
import Subscription from '../../models/Subscription.js'
import Meal from '../../models/Meal.js'
import { ApolloError } from 'apollo-server'
import { calculateDeliveryDate, getOrder, getOrders } from '../../utils/guille.js'

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
        getAllOrders: async (_, args, { currentUser }) => {

            if (!currentUser || currentUser.role !== 'ADMIN') throw new ApolloError('Not authorizated, needs permissions')

            return await Order.find()
        },

        getOneOrder: async (_, { orderID }, { currentUser }) => {

            if (!currentUser || currentUser.role !== 'ADMIN') throw new ApolloError('Not authorizated, needs permissions')

            return await Order.findById(orderID).populate('meals.mealID')
        },

        getNextOrders: async (_, args, { currentUser }) => {

            if (!currentUser || currentUser.role !== 'ADMIN') throw new ApolloError('Not authorizated, needs permissions')

            return await Order.find({ status: 'Ordered' }).populate('meals.mealID')
        },

        getMyActiveOrder: (_, args, { currentUser }) => {

            return getOrder(currentUser, 'Actived')
        },

        getMyNextOrder: async (_, args, { currentUser }) => {

            return getOrder(currentUser, 'Ordered')
        },

        getMyDeliveredOrders: async (_, args, { currentUser }) => {

            return getOrders(currentUser, 'Delivered')

        }
    },

    Mutation: {

        // TESTEAR UTIL CON BBDD CON BASE MENU!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        createOrder: async (_, args, { currentUser }) => {

            const { _id } = currentUser
            const subscription = await Subscription.findOne({ user: _id })


            const { deliveryWeekDay } = subscription
            const deliveryDate = calculateDeliveryDate(deliveryWeekDay)


            // BASE MENU
            if (!subscription.baseMenu) {

                const order = new Order({ subscription: subscription._id, deliveryDate: { day: deliveryDate } })
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

                const order = new Order({ subscription: subscriptionID, meals: mealIDs, deliveryDate: { day: deliveryDate } })
                await order.save()

                return await Order.findById(order._id).populate('meals.mealID')
            }
        },
        
        addMealToOrder: async (_, args) => {

            const { orderID, mealID } = args

            const order = await Order.findById(orderID).populate('meals.mealID')

            // es realmente necesario ??? si el id va a salir del contexto del cliente 
            if (order.status !== 'Actived') throw new ApolloError('Not able to add meal to the order')

            const mealIsInOrder = order.meals.find(meal => meal.mealID == mealID)

            if (mealIsInOrder) {
                mealIsInOrder.quantity++
            } else {
                order.meals.push({
                    mealID,
                    quantity: 1
                })
            }

            await order.save()
            return order.meals
        },
        
        removeMealFromOrder: async (_, args) => {
            const { orderID, mealID } = args

            const order = await Order.findById(orderID)

            // es realmente necesario ??? si el id va a salir del contexto del cliente 
            if (order.status !== 'Actived') throw new ApolloError('Not able to remove meal from the order')

            const meal = order.meals.find(meal => meal.mealID == mealID)
            const mealIndex = order.meals.indexOf(meal) // mirar .findIndexOf

            if (meal.quantity > 1) {
                meal.quantity--
            } else if (meal.quantity === 1) {
                order.meals.splice(mealIndex, 1)
            }

            order.save()
            return order.meals
        },

        updateOrderPrice: async (_, args) => { // volver a intentar sacarlo a un util
            const { orderID } = args

            const order = await Order.findById(orderID).populate('meals.mealID')

            let price = 0

            order.meals.forEach(meal => {
                price += (meal.mealID.price * meal.quantity)
            })

            order.price = parseFloat(price.toFixed(2))

            return await order.save()
        },

        updateDeliveryDate: async (_, { orderID, deliveryDate }) => {

            const order = await Order.findById(orderID)
            order.deliveryDate = deliveryDate

            return order.save()

        },

        confirmOrder: async (_, { orderID }) => {

            const order = await Order.findById(orderID)
            order.status = 'Ordered'

            return order.save()
        }
    }
}

export default orderResolvers