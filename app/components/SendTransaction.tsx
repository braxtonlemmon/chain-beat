import Button from './shared/Button'
import {
  type BaseError,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from 'wagmi'
import {parseEther} from 'viem'
import Card from './shared/Card'
import {useEffect, useState} from 'react'
import {isAddress} from 'ethers'
import Input from './shared/Input'
import CopyItem from './CopyItem'
import {truncateAddress} from '../utils/truncateAddress'
import makeToast from '../utils/makeToast'

type TSendTransaction = {
  balance: string
}

type FormErrors = {
  toAddress: string
  amount: string
}

function SendTransaction({balance}: TSendTransaction) {
  const [toAddress, setToAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [errors, setErrors] = useState<FormErrors>({
    toAddress: '',
    amount: '',
  })
  const {
    data: hash,
    error: sendError,
    isPending,
    sendTransaction,
    reset: resetTransaction,
  } = useSendTransaction()
  const {isLoading: isConfirming, isSuccess: isConfirmed} =
    useWaitForTransactionReceipt({hash})

  const isSubmitDisabled = isPending || !toAddress || !amount || isConfirming

  const handleToAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    setToAddress(value)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    setAmount(value)
  }

  const checkForErrors = () => {
    const isValidAddress = isAddress(toAddress)
    const asFloat = parseFloat(amount)
    const isNumber = !isNaN(parseFloat(amount))
    const isValidAmount = isNumber && asFloat <= parseFloat(balance)
    setErrors({
      toAddress: isValidAddress ? '' : 'Invalid address',

      amount: !isNumber
        ? 'Invalid number'
        : !isValidAmount
        ? 'Insufficient funds'
        : '',
    })
    return isValidAddress && isNumber && isValidAmount
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    checkForErrors()
    if (checkForErrors()) {
      const to = toAddress as `0x${string}`
      const value = amount as string
      sendTransaction({to, value: parseEther(value)})
    }
  }

  const handleClear = () => {
    setToAddress('')
    setAmount('')
    setErrors({
      toAddress: '',
      amount: '',
    })
    resetTransaction()
  }

  useEffect(() => {
    if (sendError) {
      makeToast({
        type: 'error',
        message: (sendError as BaseError).shortMessage || sendError.message,
        info: sendError,
      })
    }
  }, [sendError])

  return (
    <div className="m-3 row-start-2 md:row-start-1">
      <h2 className="text-2xl font-bold mb-2">Send ETH</h2>
      <Card>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div>
            <Input
              name="toAddress"
              label="Receiver address"
              placeholder="0x9Dd9...Cd2da"
              value={toAddress}
              onChange={handleToAddressChange}
              required
              setInputValue={setToAddress}
              readOnly={isConfirming}
            />
            {errors.toAddress && (
              <p className="text-xs text-error">Error: {errors.toAddress}</p>
            )}
          </div>
          <div>
            <Input
              name="value"
              label="Amount to send"
              placeholder="0.1"
              value={amount}
              onChange={handleAmountChange}
              required
              setInputValue={setAmount}
              readOnly={isConfirming}
            />
            {errors.amount && (
              <p className="text-xs text-error">Error: {errors.amount}</p>
            )}
          </div>
          <Button type="submit" disabled={isSubmitDisabled}>
            {isConfirming ? 'Confirming...' : 'Send'}
          </Button>
          {hash && (
            <div className="flex gap-2 justify-center items-center">
              <p className="font-bold">Transaction hash:</p>
              <p>{truncateAddress(hash)}</p>
              <CopyItem textToCopy={hash} />
            </div>
          )}
          {isConfirming && (
            <p className="text-center">Waiting for confirmation...</p>
          )}
          {isConfirmed && (
            <div className="flex flex-col gap-2">
              <p className="text-center">Transaction confirmed!</p>
              <button className="underline" onClick={() => handleClear()}>
                Clear
              </button>
            </div>
          )}
          {/* {error && (
          <div>Error: {(error as BaseError).shortMessage || error.message}</div>
        )} */}
        </form>
      </Card>
    </div>
  )
}

export default SendTransaction
