'use client'

import {useAccount, useBalance} from 'wagmi'
import AccountDashboard from './AccountDashboard'
import ConnectAccount from './ConnectAccount'
import Card from './shared/Card'
import Button from './shared/Button'
import {useEffect, useRef, useState} from 'react'
import {WalletOptions} from './WalletOptions'
import useEscapeKey from '../hooks/useEscapeKey'
import useOutsideClick from '../hooks/useOutsideClick'

function AccountPage() {
  const {isConnected} = useAccount()
  const [showWalletOptions, setShowWalletOptions] = useState(false)

  useEffect(() => {
    if (isConnected) {
      setShowWalletOptions(false)
    }
  }, [isConnected])

  return (
    <div>
      {isConnected ? (
        <AccountDashboard />
      ) : (
        <Card>
          <h3>Connect your wallet</h3>
          <Button
            onClick={() => {
              setShowWalletOptions(true)
            }}
          >
            Connect
          </Button>
          {showWalletOptions && (
            <WalletOptions
              handleCloseModal={() => setShowWalletOptions(false)}
            />
          )}
          {/* <ConnectAccount /> */}
        </Card>
      )}
    </div>
  )
}

export default AccountPage
