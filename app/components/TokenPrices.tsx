import {useEffect, useMemo, useState} from 'react'
import {getTokenData, TTokenData} from '../data/getTokenData'
import TokenCard from './TokenCard'

function TokenPrices() {
  const [tokenData, setTokenData] = useState<TTokenData[]>([])
  const tokensToFetchById = useMemo(() => {
    return [
      '1027', // Ethereum
      '5426', // Solana
      '5805', // Avalanche
      '2010', // Cardano
      '1839', // BNB
    ]
  }, [])

  const emptyTokenData: TTokenData = {
    tokenName: '',
    tokenSymbol: '',
    tokenChange24h: 0,
    tokenPrice: 0,
  }

  // Fetch token prices based on ID value in CoinMarketCap
  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        const fetchedTokenData: TTokenData[] = []
        await Promise.all(
          tokensToFetchById.map(async (tokenId) => {
            const data = await getTokenData(tokenId)
            fetchedTokenData.push(data)
          })
        )
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
  }, [tokensToFetchById])

  return (
    <div className="flex flex-col items-center row-start-3 md:row-start-2 md:col-start-1 md:col-end-3 w-full">
      <h2 className="text-2xl font-bold mb-2">Current token prices</h2>
      {tokenData.length > 0 && (
        <div className="flex flex-col items-center w-full gap-3 justify-center md:flex-row">
          {tokenData.map((token) => {
            return <TokenCard key={token.tokenSymbol} {...token} />
          })}
        </div>
      )}
      {tokenData.length === 0 && (
        <div className="flex flex-col items-center w-full gap-3 justify-center md:flex-row">
          {tokensToFetchById.map((tokenId) => (
            <TokenCard key={tokenId} loading={true} {...emptyTokenData} />
          ))}
        </div>
      )}
    </div>
  )
}

export default TokenPrices
