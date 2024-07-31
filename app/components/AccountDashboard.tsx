import SendTransaction from './SendTransaction'
import TokenPrices from './TokenPrices'
import ConnectedAccount from './ConnectedAccount'
import {useEffect, useState} from 'react'
import {useAccount, useBalance} from 'wagmi'
import {formatUnits} from 'viem'

function AccountDashboard() {
  const [balance, setBalance] = useState('')
  const {address} = useAccount()
  const balanceResult = useBalance({address})

  // Format and update wallet balance once balanceResult.data is defined
  useEffect(() => {
    if (balanceResult.data) {
      const formattedBalance = formatUnits(
        balanceResult.data.value,
        balanceResult.data.decimals
      )
      setBalance(formattedBalance)
    }
  }, [balanceResult.data])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-4">
      <ConnectedAccount balance={balance} />
      <SendTransaction balance={balance} />
      <TokenPrices />
    </div>
  )
}

export default AccountDashboard
