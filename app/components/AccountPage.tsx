'use client'

import {useAccount, useBalance} from 'wagmi'
import AccountDashboard from './AccountDashboard'
import ConnectAccount from './ConnectAccount'

function AccountPage() {
  const {isConnected} = useAccount()
  return (
    <div>
      {isConnected ? (
        <AccountDashboard />
      ) : (
        <div>
          <ConnectAccount />
        </div>
      )}
    </div>
  )
}

export default AccountPage
