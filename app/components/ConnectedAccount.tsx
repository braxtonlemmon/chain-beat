import {useAccount, useDisconnect, useSwitchChain} from 'wagmi'
import Card from './shared/Card'
import {truncateAddress} from '../utils/truncateAddress'
import Button from './shared/Button'
import CopyItem from './shared/CopyItem'
import Tooltip from './shared/Tooltip'

type TConnectedAccount = {
  balance: string
}

type TNetwork = {
  id: number
  chainName: string
}

const networks: TNetwork[] = [
  {
    id: 11155111,
    chainName: 'Testnet',
  },
  {
    id: 1,
    chainName: 'Mainnet',
  },
]

function ConnectedAccount({balance}: TConnectedAccount) {
  const {switchChain} = useSwitchChain()
  const {address, chainId, chain} = useAccount()
  const {disconnect} = useDisconnect()

  return (
    <div className="m-3 row-start-1">
      <h2 className="text-2xl font-bold mb-2">Account</h2>
      <Card>
        <div className="flex flex-col gap-2 w-full">
          <h3 className="font-bold">Connected Account: </h3>
          <div className="flex gap-2 items-center">
            <Tooltip text={String(address)} xOrientation="left-0">
              {truncateAddress(String(address))}{' '}
            </Tooltip>
            <CopyItem textToCopy={String(address)} />
          </div>
        </div>
        <hr className="border-t border-solid border-primaryText w-full" />
        <div className="flex flex-col gap-2 w-full">
          <h3 className="font-bold">Current balance: </h3>
          <p>
            {Number(balance).toFixed(4)} {chain?.nativeCurrency.symbol}
          </p>
        </div>
        <hr className="border-t border-solid border-primaryText w-full" />

        <div className="flex flex-col gap-2 w-full mb-2">
          <h3 className="font-bold">Network:</h3>
          <div className="flex gap-2">
            {networks.map(({id, chainName}) => (
              <button
                key={`network-${id}`}
                onClick={() => switchChain({chainId: id})}
                className={`p-2 rounded-md ${
                  chainId === id
                    ? 'bg-header font-bold'
                    : 'border-2 border-header border-dashed hover:border-accent'
                }`}
              >
                {chainName}
              </button>
            ))}
          </div>
        </div>
        <hr className="border-t border-solid border-primaryText w-full mb-2" />

        <Button onClick={() => disconnect()}>Disconnect</Button>
      </Card>
    </div>
  )
}

export default ConnectedAccount
