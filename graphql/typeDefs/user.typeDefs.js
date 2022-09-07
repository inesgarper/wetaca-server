import { gql } from "apollo-server"

const userTypeDefs = gql`

    # Definitions

    type User{
        name: String!
        lastName: String!
        email: String!
        password: String!
        phoneNumber: Int!
        birthDate: Date!
        paymentMethods: PaymentMethods
        id: ID!
    }

    type PaymentMethods{
        cardNumber: String!
        cardName: String!
        securityCode: Int!
        expiration: Date!
    }
   
    type Token{
        value: String!
    }


    # Querys

    type Query{
        getCurrentUser: User
        getAllUsers: [User]
    }


    # Inputs

    input UserInput{
        name: String
        lastName: String
        email: String
        password: String
        phoneNumber: Int
        birthDate: Date
        paymentMethods: PaymentMethodsInput
    }

    input PaymentMethodsInput{
        cardNumber: String!
        cardName: String!
        securityCode: Int!
        expiration: Date!
    }


    # Mutations

    type Mutation{
        createUser(userData: UserInput): User
        deleteUser(id: ID!): String
        updateUser(id: ID!, user: UserInput): User
        login(
            email: String!
            password: String!
        ): Token
    }


    # Custom Scalars

    scalar Date
`

export default userTypeDefs