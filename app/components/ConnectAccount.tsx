import {ConnectKitButton} from 'connectkit'
import {useDisconnect} from 'wagmi'
import Button from './shared/Button'

function ConnectAccount() {
  const {disconnect} = useDisconnect()
  return (
    <ConnectKitButton.Custom>
      {({isConnected, show, truncatedAddress, ensName}) => {
        return (
          <>
            {isConnected && (
              <Button onClick={() => disconnect()}>Disconnect</Button>
            )}
            {!isConnected && (
              <Button
                className="border border-black border-solid"
                onClick={show}
              >
                Connect
              </Button>
            )}
          </>
        )
      }}
    </ConnectKitButton.Custom>
  )
}

export default ConnectAccount
