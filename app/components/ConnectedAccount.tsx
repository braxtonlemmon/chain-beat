import {useAccount, useSwitchChain} from 'wagmi'
import Card from './shared/Card'
import {truncateAddress} from '../utils/truncateAddress'
import ConnectAccount from './ConnectAccount'

function ConnectedAccount() {
  const {switchChain} = useSwitchChain()
  const {address} = useAccount()

  return (
    <Card>
      <h2>Connected Account: {truncateAddress(String(address))} </h2>
      <div className="flex gap-2">
        <button onClick={() => switchChain({chainId: 11155111})}>
          testnet
        </button>
        <button onClick={() => switchChain({chainId: 1})}>mainnet</button>
      </div>
      <ConnectAccount />
    </Card>
  )
}

export default ConnectedAccount
