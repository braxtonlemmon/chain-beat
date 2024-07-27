'use server'

import {config} from '../../config'

type TEtherscanResponse = {
  result: {
    hash: string
    value: string
    from: string
    to: string
    timeStamp: string
  }[]
}

export async function getTransactions(page: number, userAddress: string) {
  const apiKey = config.etherscanApiKey
  const url = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${userAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${apiKey}`
  const res = await fetch(url)
  const data: TEtherscanResponse = await res.json()
  return data
}
