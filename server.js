import 'dotenv/config'
import './db/index.js'

import { ApolloServer } from 'apollo-server'
import { typeDefs } from './graphql/typeDefs/index.js'
import { resolvers } from './graphql/resolvers/index.js'


const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})