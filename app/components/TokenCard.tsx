import {TrendingDown, TrendingUp} from 'react-feather'
import Card from './shared/Card'
import {TTokenData} from '../graphql/resolvers'

type TTokenCard = TTokenData & {loading?: boolean}

function TokenCard({
  tokenName,
  tokenPrice,
  tokenChange24h,
  loading,
}: TTokenCard) {
  return (
    <Card style={{width: '150px', height: '165px'}}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p className="font-bold">{tokenName}</p>
          <p>
            {tokenPrice?.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </p>
          <div className="flex flex-col gap-0 items-center justify-center">
            {tokenChange24h > 0 ? (
              <TrendingUp size={26} color="lightgreen" />
            ) : (
              <TrendingDown size={26} color="#ba616b" />
            )}
            <p className="text-xs">{`past 24 hr`}</p>
          </div>
        </>
      )}
    </Card>
  )
}

export default TokenCard
