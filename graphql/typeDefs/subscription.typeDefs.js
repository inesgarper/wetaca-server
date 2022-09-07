import { gql } from "apollo-server"

const subscriptionTypeDefs = gql`

    # Enums

    enum DayOfTheWeek {
        SATURDAY
        SUNDAY
        MONDAY
        TUESDAY
        WEDNESDAY
    }

    enum SubscriptionStatus {
        ACTIVED
        PAUSED
        CANCELLED
    }

    # Definitions

    type Subscription{
        user: User
        status: SubscriptionStatus!
        baseMenu: BaseMenu
        address: Address!
        deliveryWeekDay: DayOfTheWeek!
        id: ID!
    }

    type BaseMenu{
        meals: Meals
        maxPrice: Float
    }

    type Meals{
        total: Float
        perCategory: Categories
    }

    type Categories {
        meat: Int
        chicken: Int
        fish: Int
        pasta: Int
        rice: Int
        gratinated: Int
        legume: Int
        international: Int
        veggie: Int
        starter: Int
        full: Int
        light: Int
        dessert: Int
    }

    type Address {
        street: String!
        number: Int!
        city: String!
        province: String!
        postCode: Int!
    }

    # Inputs

    input SubscriptionInput{
        address: AdressInput
        deliveryWeekDay: String
    }

    input AdressInput {
        street: String!
        number: Int!
        city: String!
        province: String!
        postCode: Int!
    }

    # Querys
    
    type Query{

        getAllSubs: [Subscription]

        getOneUserSubs(
            user: ID!
        ): [Subscription]

        getMySubs: [Subscription]

        getOneSub(
            subs: ID!
        ): Subscription
    }

    # Mutations

    type Mutation{

        createSubscription(
            subscriptionData: SubscriptionInput!
        ) : Subscription

        updateStatus(
            subs: ID!, 
            status: String!
        ): Subscription

        updateDeliveryWeekDay(
            subs: ID!, 
            day: String!
        ): Subscription

        deleteSubscription(
            subs: ID!
        ): String

        createBaseMenu(
            orderID: ID
        ): BaseMenu
    }

`

export default subscriptionTypeDefs