import {useEffect, useState} from 'react'
import {getTokenData, TTokenData} from '../data/getTokenData'
import TokenCard from './TokenCard'

function TokenPrices() {
  const [tokenData, setTokenData] = useState<TTokenData[]>([])

  // Fetch token prices based on ID value in CoinMarketCap
  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        const tokensToFetchById = [
          '1027', // Ethereum
          '5426', // Solana
          '5805', // Avalanche
          '2010', // Cardano
          '1839', // BNB
        ]
        const fetchedTokenData: TTokenData[] = []
        await Promise.all(
          tokensToFetchById.map(async (tokenId) => {
            const data = await getTokenData(tokenId)
            fetchedTokenData.push(data)
          })
        )
        console.log('tag data', fetchedTokenData)
        setTokenData(fetchedTokenData)
      } catch (error) {
        // TODO: error handling
        console.error('problem fetching')
      }
    }
    fetchTokenData()

    // Poll - refetch current prices every 60 seconds (frequency based on CoinMarketCap API plan)
    const interval = setInterval(() => {
      fetchTokenData()
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex">
      {tokenData.map((token) => {
        return <TokenCard key={token.tokenSymbol} {...token} />
      })}
    </div>
  )
}

export default TokenPrices
