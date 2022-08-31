import { gql } from "apollo-server"

const orderTypeDefs = gql`

    # Enums

    enum OrderStatus {
        ACTIVED
        ORDERED
        DELIVERED
    }

    enum TimeSlot {
        MORNING
        EVENING
    }

    # Definitions

    type Order{
        subscription: Subscription
        meals: [OrderMeals]
        price: Float
        status: OrderStatus
        deliveryDate: DeliveryDate
    }

    type OrderMeals{
        mealID: Meal
        quantity: Int
    }

    type DeliveryDate{
        day: Date
        hour: TimeSlot
    }


    # Inputs

    # input OrderInput{
    #     subscription: ID
    # }

    # Querys

    type Query{

        getAllOrders: [Order],

        # getOrderDetails(
        #     orderID: ID
        # ): Order,

        # getOrdersByStatus(
        #     orderStatus: OrderStatus
        # ): [Order]
    }


    # Mutations

    type Mutation{
        
        createOrder(
            subscriptionID: ID,
        ): Order,

        addMealToOrder(
            orderID: ID,
            mealID: ID
        ): [OrderMeals],

        removeMealFromOrder(
            orderID: ID,
            mealID: ID
        ): [OrderMeals]

        updateOrderPrice(
            orderID: ID, 
        ): Order,

        confirmOrder(
            orderID: ID,
        ): Order,

        # deleteOrder(
        #     orderID: ID
        # ): String
    }


    # Custom Scalars
    scalar Date
`

export default orderTypeDefs