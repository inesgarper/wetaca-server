import { gql } from "apollo-server"

const userTypeDefs = gql`

    type User{
        name: String!
        lastName: String!
        email: String!
        id: ID!
    }
   
    type Query{
        hello: String
    }

    input UserInput{
        name: String!
        lastName: String!
        email: String!
    }

    type Mutation{
        createUser(user: UserInput): User
    }
`

export default userTypeDefs