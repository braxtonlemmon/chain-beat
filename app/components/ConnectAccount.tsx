import {useAccount, useDisconnect} from 'wagmi'
import Button from './shared/Button'
import {WalletOptions} from './WalletOptions'

function ConnectAccount() {
  const {disconnect} = useDisconnect()
  const {isConnected} = useAccount()
  return (
    <>
      {isConnected && <Button onClick={() => disconnect()}>Disconnect</Button>}
      {!isConnected && <WalletOptions />}
    </>
  )
}

export default ConnectAccount
