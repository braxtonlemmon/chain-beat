'use server'
import client from '../graphql/apollo-client'
import {TSingleTransaction} from '../graphql/resolvers'
import TRANSACTIONS_DATA_QUERY from '../graphql/queries/getTransactions.gql'

// Fetch transaction data using Etherscan API
export async function getTransactions(
  page: number,
  userAddress: string,
  useCache: boolean
): Promise<TSingleTransaction[]> {
  const {data} = await client.query({
    query: TRANSACTIONS_DATA_QUERY,
    variables: {page, userAddress},
    fetchPolicy: useCache ? 'cache-first' : 'network-only',
  })
  return data.transactionData
}
