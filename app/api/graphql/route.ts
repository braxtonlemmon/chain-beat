import {ApolloServer} from '@apollo/server'
import {startServerAndCreateNextHandler} from '@as-integrations/next'
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core'

import typeDefs from '../../graphql/schema'
import resolvers from '../../graphql/resolvers'
import allowCors from '../../utils/allowCors'
import {NextRequest} from 'next/server'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
})

// const handler = startServerAndCreateNextHandler(apolloServer, {
//   context: async (req, res) => ({req, res}),
// })

const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer, {
  context: async (req, res) => ({req, res}),
})

export default allowCors(handler)
