import { gql } from "apollo-server"

const subscriptionTypeDefs = gql`

    # Definitions

    type Subscription{
        user: User
        status: String!
        baseMenu: BaseMenu
        address: Address!
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
        carne: Float
        pollo: Float
        pescado: Float
        pasta: Float
        gratinado: Float
        arroz: Float
        legumbres: Float
        internacional: Float
    }

    type Address {
        street: String!
        number: Float!
        city: String!
        province: String!
        postCode: Float!
    }

    # Querys
    
    type Query{
        getAllSubs: [Subscription]
        getOneUserSubs(user: ID!): [Subscription]
        getMySubs: [Subscription]
        getOneSub(subs: ID!): Subscription
    }


    # Inputs

    input SubscriptionInput{
        address: AdressInput
    }

    input AdressInput {
        street: String!
        number: Float!
        city: String!
        province: String!
        postCode: Float!
    }


    # Mutations

    type Mutation{
        createSubscription(subscriptionData: SubscriptionInput) : Subscription
        updateStatus(subs: ID!, status: String): Subscription
        deleteSubscription(subs: ID!): String
    }

`

export default subscriptionTypeDefs