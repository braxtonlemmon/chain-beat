import {ApolloClient, InMemoryCache} from '@apollo/client'

const environment = process.env.NEXT_PUBLIC_ENVIRONMENT

const uri =
  environment === 'local'
    ? 'http://localhost:3000/api/graphql'
    : 'https://chain-beat.vercel.app/api/graphql'

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
})

export default client
