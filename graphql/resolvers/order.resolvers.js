import Order from '../../models/Order.js'

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

        // getMealDetails: async (_, args) => await Meal.findById({ _id: args.mealID }),

        // getMealsByCategory: async (_, args) => {
        //     const { mealCategory } = args

        //     const meals = await Meal.find({ category: mealCategory })
        //     return meals
        // }
    },

    Mutation: {
        createOrder: (_, args) => {
            const { subscriptionID } = args

            const order = new Order({ subscription: subscriptionID })
            return order.save()
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

        confirmOrder: async (_, args) => {
            const { orderID } = args

            const order = await Order.findById(orderID)
            order.status = 'Ordered'

            return order.save()
        }
    }
}

export default orderResolvers