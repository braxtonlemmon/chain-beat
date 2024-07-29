import {ConnectKitButton} from 'connectkit'
import SendTransaction from './SendTransaction'
import TokenPrices from './TokenPrices'
import ConnectedAccount from './ConnectedAccount'
import ConnectAccount from './ConnectAccount'

function AccountDashboard() {
  return (
    <div>
      <ConnectedAccount />
      <SendTransaction />
      <TokenPrices />
    </div>
  )
}

export default AccountDashboard
