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
        paymentMethods: [PaymentMethods]
        id: ID!
    }

    type PaymentMethods{
        cardNumber: String
        cardName: String
        securityCode: Int
        expiration: Date
        id: ID!
    }
   
    type Token{
        value: String!
    }


    # Inputs

    input UserInput{
        name: String
        lastName: String
        email: String
        password: String
        phoneNumber: Int
        birthDate: Date
    }

    input PaymentMethodsInput{
        cardNumber: String
        cardName: String
        securityCode: Int
        expiration: Date
    }

    # Querys

    type Query{

        getCurrentUser: User

        getAllUsers: [User]
    }

    # Mutations

    type Mutation{

        createUser(
            userData: UserInput
        ): User

        updateUser(
            userData: UserInput
        ): User

        addPaymentMethod(
            paymentMethodData: PaymentMethodsInput!
        ): User

        deletePaymentMethod(
            paymentMethodID: ID!
        ): User

        deleteUser(
            id: ID!
        ): String

        login(
            email: String!
            password: String!
        ): Token
    }


    # Custom Scalars

    scalar Date
`

export default userTypeDefs