import { gql } from "apollo-server"

const userTypeDefs = gql`

    type User{
        name: String!
        lastName: String!
        email: String!
        password: String!
        id: ID!
    }
   
    type Query{
        hello: String
        getCurrentUser: User
    }

    type Token{
        value: String!
    }

    input UserInput{
        name: String!
        lastName: String!
        email: String!
        password: String!
    }

    type Mutation{
        createUser(user: UserInput): User

        login(
            email: String!
            password: String!
        ): Token
    }
`

export default userTypeDefs