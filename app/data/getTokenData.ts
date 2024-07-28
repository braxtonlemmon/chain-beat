'use server'

import {config} from '../../config'

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

export type TTokenData = {
  tokenName: string
  tokenSymbol: string
  tokenPrice: number
  tokenChange24h: number
}

export async function getTokenData(tokenId: string): Promise<TTokenData> {
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
}
