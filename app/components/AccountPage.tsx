'use client'

import {useAccount, useBalance} from 'wagmi'
import AccountDashboard from './AccountDashboard'
import ConnectAccount from './ConnectAccount'
import Card from './shared/Card'

function AccountPage() {
  const {isConnected} = useAccount()
  return (
    <div>
      {isConnected ? (
        <AccountDashboard />
      ) : (
        <Card>
          <h3>Connect your wallet</h3>
          <ConnectAccount />
        </Card>
      )}
    </div>
  )
}

export default AccountPage
