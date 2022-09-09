import 'dotenv/config'
import './db/test-db.js'

import { ApolloServer } from 'apollo-server'
import { typeDefs } from './graphql/typeDefs/index.js'
import { resolvers } from './graphql/resolvers/index.js'

import { makeExecutableSchema } from '@graphql-tools/schema'
import { applyMiddleware } from 'graphql-middleware'
import isAdminMiddleware from './middlewares/isAdmin.js'
import isAuthenticatedMiddleware from './middlewares/isAuthenticated.js'


const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const schemaWithMiddleware = applyMiddleware(
    schema,
    isAdminMiddleware,
    isAuthenticatedMiddleware
)

export const userContext = {
    id: "",
    role: "ADMIN",
    name: "Test",
    lastName: "User",
    email: "testuser@gmail.com",
    password: "$2a$10$4U6JBdyhmwmvZfd3Qq9IfOtJM5lFCt7rEe6DrzS7Lj4yoiXNxs69K",
    phoneNumber: 123456789,
    birthDate: "11-11-1111"
}

export function getContext(models, viewer) {
    return {
        ...models,
        viewer
    }
}

const testServer = new ApolloServer({
    schema: schemaWithMiddleware,
    context: {
        currentUser: userContext
    }
})

export default testServer