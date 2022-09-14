import Order from "../models/Order.js"

const updateOrderPrice = async (orderID) => {

    const order = await Order.findById(orderID).populate('meals.mealID')

    let price = 0

    order.meals.forEach(meal => {
        price += (meal.mealID.price * meal.quantity)
    })

    order.price = parseFloat(price.toFixed(2))

    return await order.save()
}

export default updateOrderPrice