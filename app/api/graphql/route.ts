import {ApolloServer} from '@apollo/server'
import {startServerAndCreateNextHandler} from '@as-integrations/next'
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core'

import typeDefs from '../../graphql/schema'
import resolvers from '../../graphql/resolvers'
import {NextRequest} from 'next/server'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer, {
  context: async (req) => ({req}),
})

export {handler as GET, handler as POST}
