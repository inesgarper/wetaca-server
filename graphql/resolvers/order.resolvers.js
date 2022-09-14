import Order from '../../models/Order.js'
import Subscription from '../../models/Subscription.js'
import Meal from '../../models/Meal.js'
import { ApolloError } from 'apollo-server'
import { getOrder, getOrders } from '../../utils/getOrder.js'
import updateOrderPrice from '../../utils/updateOrderPrice.js'
import calculateDeliveryDate from '../../utils/calculateDeliveryDate.js'

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

        getMyActiveOrder: (_, args, { currentUser }) => getOrder(currentUser, 'Actived'),

        getMyNextOrder: async (_, args, { currentUser }) => getOrder(currentUser, 'Ordered'),

        getMyDeliveredOrders: async (_, args, { currentUser }) => getOrders(currentUser, 'Delivered')
    },

    Mutation: {

        createOrder: async (_, args, { currentUser }) => {

            const { _id } = currentUser
            const subscription = await Subscription.findOne({ user: _id })
            const isFirstOrder = !subscription.baseMenu.maxPrice


            const { deliveryWeekDay } = subscription
            const deliveryDate = calculateDeliveryDate(deliveryWeekDay)


            // BASE MENU
            if (isFirstOrder) {

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

        addMealToOrder: async (_, { mealID }, { currentUser }) => {

            const { _id } = currentUser

            const subscription = await Subscription.findOne({ user: _id })
            const order = await Order.findOne({ subscription: subscription._id, status: 'Actived' })

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

            const updatedOrder = await updateOrderPrice(order._id)

            return updatedOrder.meals
        },

        removeMealFromOrder: async (_, { mealID }, { currentUser }) => {

            const { _id } = currentUser

            const subscription = await Subscription.findOne({ user: _id })
            const order = await Order.findOne({ subscription: subscription._id, status: 'Actived' })

            const meal = order.meals.find(meal => meal.mealID == mealID)
            const mealIndex = order.meals.indexOf(meal)

            if (meal.quantity > 1) {
                meal.quantity--
            } else if (meal.quantity === 1) {
                order.meals.splice(mealIndex, 1)
            }

            await order.save()

            const updatedOrder = await updateOrderPrice(order._id)

            return updatedOrder.meals
        },

        updateDeliveryDate: async (_, { deliveryDate }, { currentUser }) => {

            const { _id } = currentUser

            const subscription = await Subscription.findOne({ user: _id })
            const order = await Order.findOne({ subscription: subscription._id, status: 'Actived' })

            order.deliveryDate = deliveryDate

            return order.save()

        },

        confirmOrder: async (_, args, { currentUser }) => {

            const { _id } = currentUser

            const subscription = await Subscription.findOne({ user: _id })
            const order = await Order.findOne({ subscription: subscription._id, status: 'Actived' }).populate('meals.mealID')

            order.status = 'Ordered'

            return order.save()
        }
    }
}

export default orderResolvers


// ENCONTRAR ORDER
// const { _id } = currentUser

// const subscription = await Subscription.findOne({ user: _id })
// const order = await Order.findOne({ subscription: subscription._id, status: 'Actived' })
