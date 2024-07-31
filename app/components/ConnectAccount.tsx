import Button from './shared/Button'
import Card from './shared/Card'
import {WalletOptions} from './WalletOptions'

type TConnectAccount = {
  setShowWalletOptions: (show: boolean) => void
  showWalletOptions: boolean
}

function ConnectAccount({
  setShowWalletOptions,
  showWalletOptions,
}: TConnectAccount) {
  return (
    <div className="m-3">
      <h2 className="text-2xl font-bold mb-2 text-center">Account</h2>
      <Card style={{maxWidth: '500px'}}>
        <h3 className="text-center">
          To view your account details, click the button below and connect your
          wallet.
        </h3>
        <Button
          onClick={() => {
            setShowWalletOptions(true)
          }}
        >
          Connect
        </Button>
        {showWalletOptions && (
          <WalletOptions handleCloseModal={() => setShowWalletOptions(false)} />
        )}
      </Card>
    </div>
  )
}

export default ConnectAccount
