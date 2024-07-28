import {TTokenData} from '../data/getTokenData'

function TokenCard({tokenName, tokenPrice, tokenChange24h}: TTokenData) {
  return (
    <div className="flex flex-col w-30 border border-solid border-black">
      <p>{tokenName}</p>
      <p>
        {tokenPrice?.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </p>
      <p>{tokenChange24h > 0 ? 'up' : 'down'}</p>
    </div>
  )
}

export default TokenCard
