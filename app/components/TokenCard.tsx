import {TTokenData} from '../data/getTokenData'
import Card from './shared/Card'

function TokenCard({tokenName, tokenPrice, tokenChange24h}: TTokenData) {
  return (
    <Card style={{width: '100px'}}>
      <p>{tokenName}</p>
      <p>
        {tokenPrice?.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </p>
      <p>{tokenChange24h > 0 ? 'up' : 'down'}</p>
    </Card>
  )
}

export default TokenCard
