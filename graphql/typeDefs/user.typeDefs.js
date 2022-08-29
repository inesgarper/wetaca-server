import { gql } from "apollo-server"

const userTypeDefs = gql`

    type User{
        name: String!
        lastName: String!
        email: String!
        password: String!
        phoneNumber: Float
        # birthDate: Date
        paymentMethods: PaymentMethods
        id: ID!
    }

    type PaymentMethods{
        cardNumber: String
        cardName: String
        securityCode: Float
        # expiration: Date
    }
   
    type Query{
        getCurrentUser: User
        getAllUsers: [User]
    }

    type Token{
        value: String!
    }

    input UserInput{
        name: String
        lastName: String
        email: String
        password: String
        phoneNumber: Float
        # birthDate: Date
        paymentMethods: PaymentMethodsInput
    }

    input PaymentMethodsInput{
        cardNumber: String
        cardName: String
        securityCode: Float
        # expiration: Date
    }

    type Mutation{
        createUser(user: UserInput): User
        deleteUser(id: ID!): String
        updateUser(id: ID!, user: UserInput): User
        login(
            email: String!
            password: String!
        ): Token
    }
`

export default userTypeDefs