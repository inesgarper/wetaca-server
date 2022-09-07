import 'dotenv/config'
import './db/index.js'

import { ApolloServer } from 'apollo-server'
import { typeDefs } from './graphql/typeDefs/index.js'
import { resolvers } from './graphql/resolvers/index.js'
import User from './models/User.js'
import jwt from 'jsonwebtoken'

const server = new ApolloServer({
    typeDefs,
    resolvers,
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