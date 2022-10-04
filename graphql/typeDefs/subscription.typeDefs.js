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
        user: User!
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
        deliveryWeekDay: DayOfTheWeek
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

        getAllSubscriptions: [Subscription]

        getOneUserSubscription(
            userID: ID!
        ): Subscription

        getMySubcription: [Subscription]
    }

    # Mutations

    type Mutation{

        createSubscription(
            subscriptionData: SubscriptionInput!
        ) : Subscription

        updateSubscriptionStatus(
            status: String!
        ): Subscription

        updateDeliveryWeekDay(
            day: String!
        ): Subscription

        deleteSubscription(
            subscriptionID: ID!
        ): String

        createBaseMenu: BaseMenu
    }

`

export default subscriptionTypeDefs