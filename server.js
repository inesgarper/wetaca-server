import 'dotenv/config'
import './db/index.js'

import { ApolloServer, ApolloError } from 'apollo-server'
import { typeDefs } from './graphql/typeDefs/index.js'
import { resolvers } from './graphql/resolvers/index.js'
import User from './models/User.js'
import jwt from 'jsonwebtoken'

import { makeExecutableSchema } from '@graphql-tools/schema'
import { applyMiddleware } from 'graphql-middleware'



const isAdminMiddleware = {
    Query: {
        getMealsToCook: async (resolve, parent, args, context, info) => {

            if (!context.currentUser || context.currentUser.role !== 'ADMIN') throw new ApolloError('Not authorizated, needs permissions')

            const result = await resolve(parent, args, context, info)
            return result
        }
    }
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const schemaWithMiddleware = applyMiddleware(
    schema,
    isAdminMiddleware
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

export default server








// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: async ({ req }) => {
//         const auth = req ? req.headers.authorization : null

//         if (auth && (auth.startsWith('bearer ') || auth.startsWith('Bearer '))) {
//             const token = auth.substring(7)
//             const { _id } = jwt.verify(token, 'secret')
//             const currentUser = await User.findById(_id)
//             return { currentUser }
//         }
//     }
// })

// server.listen().then(({ url }) => {
//     console.log(`Server ready at ${url}`)
// })

// export default server