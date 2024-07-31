import {useRef} from 'react'
import {Connector, useConnect} from 'wagmi'
import Button from './shared/Button'
import useOutsideClick from '../hooks/useOutsideClick'
import useEscapeKey from '../hooks/useEscapeKey'
import Image from 'next/image'

type TWalletOptions = {
  handleCloseModal: () => void
}

type TConnectorId =
  | 'walletConnect'
  | 'com.brave.wallet'
  | 'app.phantom'
  | 'io.metamask'
type TConnector = {icon: string; color: string}
type TConnectors = {[key in TConnectorId]: TConnector}

const connectorInfo: TConnectors = {
  walletConnect: {
    icon: '/walletIcons/walletConnect.svg',
    color: '#9243e7',
  },
  'com.brave.wallet': {
    icon: '/walletIcons/brave.svg',
    color: '#ff2001',
  },
  'app.phantom': {
    icon: '/walletIcons/phantom.svg',
    color: '#3c315b',
  },
  'io.metamask': {
    icon: '/walletIcons/metamask.svg',
    color: '#24282e',
  },
}

export function WalletOptions({handleCloseModal}: TWalletOptions) {
  const {connectors, connect} = useConnect()
  const modalRef = useRef(null)
  useOutsideClick(() => handleCloseModal(), modalRef)
  useEscapeKey(() => handleCloseModal())

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0 bg-[#00000045]">
          <div
            className="bg-cardBackground flex flex-col px-12 py-8 rounded-lg gap-4"
            ref={modalRef}
          >
            <p className="font-bold text-lg">Connect a wallet:</p>
            {connectors.map((connector) => {
              const connectorId = connector.id as TConnectorId
              return (
                <Button
                  key={connector.uid}
                  onClick={() => connect({connector})}
                  style={{
                    backgroundColor: `${connectorInfo[connectorId].color}`,
                  }}
                >
                  <div className="flex gap-2 items-center">
                    <Image
                      src={connectorInfo[connectorId].icon}
                      alt="Brave logo"
                      width={32}
                      height={32}
                    />

                    <p>{connector.name}</p>
                  </div>
                </Button>
              )
            })}
            <button
              onClick={() => handleCloseModal()}
              className="underline hover:scale-[1.03]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
