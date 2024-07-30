import {useRef} from 'react'
import {Connector, useConnect} from 'wagmi'
import Button from './shared/Button'
import useOutsideClick from '../hooks/useOutsideClick'
import useEscapeKey from '../hooks/useEscapeKey'

type TWalletOptions = {
  handleCloseModal: () => void
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
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 bg-[#00000045]">
          <div
            className="bg-cardBackground flex flex-col px-12 py-8 rounded-lg gap-2"
            ref={modalRef}
          >
            {connectors.map((connector) => {
              return (
                <Button
                  key={connector.uid}
                  onClick={() => connect({connector})}
                >
                  {connector.name}
                </Button>
              )
            })}
            <button onClick={() => handleCloseModal()}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}
