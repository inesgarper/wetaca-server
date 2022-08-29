import { gql } from "apollo-server"

const userTypeDefs = gql`

    type User{
        name: String!
        lastName: String!
        email: String!
        password: String!
        phoneNumber: Float
        # birthDate: Date
        # address: Address
        paymentMethods: PaymentMethods
        id: ID!
    }

    type Address{
        street: String
        number: Float
        city: String
        province: String
        postCode: Float
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