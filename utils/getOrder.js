import Order from '../models/Order.js'
import Subscription from '../models/Subscription.js'

export const getOrder = async (currentUser, status) => {

    const { _id } = currentUser

    const subscription = await Subscription.findOne({ user: _id })
    const foundOrder = await Order.findOne({ subscription: subscription._id, status }).populate('meals.mealID')
    // console.log('USER ----------------------------------------->', currentUser)
    // console.log('ORDER ----------------------------------------->', foundOrder)
    return foundOrder
}

export const getOrders = async (currentUser, status) => {

    const { _id } = currentUser

    const subscription = await Subscription.findOne({ user: _id })
    const foundOrders = await Order.find({ subscription: subscription._id, status }).populate('meals.mealID')

    return foundOrders
}