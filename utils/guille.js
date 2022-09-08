import Order from '../models/Order.js'
import Subscription from '../models/Subscription.js'

export const getOrder = async (currentUser, status) => {

    const { _id } = currentUser

    const subscription = await Subscription.findOne({ user: _id })
    const foundOrder = await Order.findOne({ subscription: subscription._id, status }).populate('meals.mealID')

    return foundOrder
}

export const getOrders = async (currentUser, status) => {

    const { _id } = currentUser

    const subscription = await Subscription.findOne({ user: _id })
    const foundOrders = await Order.find({ subscription: subscription._id, status }).populate('meals.mealID')

    return foundOrders
}

export const calculateDeliveryDate = (deliveryWeekDay) => {

    if (deliveryWeekDay === 0) deliveryWeekDay = 7

    const todayDate = new Date()
    const todayWeekDay = todayDate.getDay()

    let daysToDeliver = deliveryWeekDay - todayWeekDay

    if (daysToDeliver < 0) daysToDeliver = 7 + daysToDeliver

    return new Date(todayDate.setDate(todayDate.getDate() + daysToDeliver))

}