'use server'
import {gql} from '@apollo/client'
import client from '../graphql/apollo-client'
import {TTokenData} from '../graphql/resolvers'
import TOKEN_DATA_QUERY from '../graphql/queries/getTokenData.gql'

export async function getTokenData(tokenId: string): Promise<TTokenData> {
  const {data} = await client.query({
    query: TOKEN_DATA_QUERY,
    variables: {tokenId},
    fetchPolicy: 'network-only',
  })
  return data.tokenData
}
