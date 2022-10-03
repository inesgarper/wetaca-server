import 'dotenv/config'
import './db/index.js'

import { ApolloServer } from 'apollo-server'
import { typeDefs } from './graphql/typeDefs/index.js'
import { resolvers } from './graphql/resolvers/index.js'
import User from './models/User.js'
import jwt from 'jsonwebtoken'

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

const server = new ApolloServer({
    schema: schemaWithMiddleware,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null

        if (auth && (auth.startsWith('bearer ') || auth.startsWith('Bearer '))) {
            const token = auth.substring(7)
            const { _id } = jwt.verify(token, 'secret')
            const currentUser = await User.findById(_id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})