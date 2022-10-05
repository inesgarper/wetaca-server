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
        id: ID!
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

    input DeliveryDateInput{
        day: Date
        hour: TimeSlot
    }

    # Querys

    type Query{

        getAllOrders: [Order],
        
        getOneOrder(
            orderID: ID!
        ): Order,
        
        getNextOrders: [Order],

        getMyActiveOrder: Order,

        getMyNextOrder: Order,

        getMyDeliveredOrders: [Order]

    }


    # Mutations

    type Mutation{
        
        createOrder: Order

        addMealToOrder(
            mealID: ID
        ): Order

        removeMealFromOrder(
            mealID: ID
        ): Order

        updateDeliveryDate(
            deliveryDate: DeliveryDateInput
        ): Order

        confirmOrder: Order
    }


    # Custom Scalars
    scalar Date
`

export default orderTypeDefs