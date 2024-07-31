import {config} from '@/config'

type TCoinMarketCapResponse = {
  data: {
    [id: string]: {
      name: string
      symbol: string
      quote: {
        USD: {
          price: number
          percent_change_24h: number
        }
      }
    }
  }
}

type TEtherscanResponse = {
  result: {
    hash: string
    value: string
    from: string
    to: string
    timeStamp: string
  }[]
}

export type TSingleTransaction = {
  from: string
  hash: string
  timeStamp: string
  to: string
  value: string
}

export type TTokenData = {
  tokenName: string
  tokenSymbol: string
  tokenPrice: number
  tokenChange24h: number
}

const resolvers = {
  Query: {
    tokenData: async (
      _: any,
      {tokenId}: {tokenId: string}
    ): Promise<TTokenData> => {
      const apiKey = config.coinmarketcapApiKey
      const url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=${tokenId}`
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'X-CMC_PRO_API_KEY': apiKey,
        },
      })
      const data: TCoinMarketCapResponse = await res.json()
      const {
        name,
        symbol,
        quote: {
          USD: {price, percent_change_24h},
        },
      } = data.data[tokenId]

      return {
        tokenName: name,
        tokenSymbol: symbol,
        tokenPrice: price,
        tokenChange24h: percent_change_24h,
      }
    },
    transactionData: async (
      _: any,
      {page, userAddress}: {page: number; userAddress: string}
    ): Promise<TSingleTransaction[]> => {
      const apiKey = config.etherscanApiKey
      const url = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${userAddress}&startblock=0&endblock=99999999&page=${page}&offset=10&sort=desc&apikey=${apiKey}`
      const res = await fetch(url)
      const data: TEtherscanResponse = await res.json()
      return data.result
    },
  },
}

export default resolvers
