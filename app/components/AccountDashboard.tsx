import SendTransaction from './SendTransaction'
import TokenPrices from './TokenPrices'
import ConnectedAccount from './ConnectedAccount'

function AccountDashboard() {
  return (
    <div className="grid grid-cols-2 justify-between">
      <ConnectedAccount />
      <SendTransaction />
      <TokenPrices />
    </div>
  )
}

export default AccountDashboard
