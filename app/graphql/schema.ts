import {gql} from 'graphql-tag'

const typeDefs = gql`
  type Query {
    tokenData(tokenId: String): TokenData
    transactionData(page: Int, userAddress: String): [Transaction]
  }

  type TokenData {
    tokenName: String
    tokenSymbol: String
    tokenPrice: Float
    tokenChange24h: Float
  }

  type Transaction {
    hash: String
    value: String
    from: String
    to: String
    timeStamp: String
  }
`
export default typeDefs
