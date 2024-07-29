import Button from './shared/Button'
import {
  // type BaseError,
  useAccount,
  useBalance,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from 'wagmi'
import {formatUnits, parseEther} from 'viem'
import Card from './shared/Card'
import {useEffect, useState} from 'react'
import {isAddress} from 'ethers'

type FormErrors = {
  toAddress: string
  amount: string
}

function SendTransaction() {
  const [toAddress, setToAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [errors, setErrors] = useState<FormErrors>({toAddress: '', amount: ''})
  const [balance, setBalance] = useState('')

  const {data: hash, error, isPending, sendTransaction} = useSendTransaction()
  const {isLoading: isConfirming, isSuccess: isConfirmed} =
    useWaitForTransactionReceipt({hash})
  const {address} = useAccount()
  const balanceResult = useBalance({address})

  const isSubmitDisabled = isPending || !toAddress || !amount

  const handleToAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    setToAddress(value)
  }

  const handleToAddressBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    const isValidAddress = isAddress(value)
    if (!isValidAddress) {
      setErrors({...errors, toAddress: 'Invalid address'})
    } else {
      setErrors({...errors, toAddress: ''})
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    setAmount(value)
  }

  const handleAmountBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    const asFloat = parseFloat(value)
    const isNumber = !isNaN(parseFloat(value))
    const isValidAmount = isNumber && asFloat <= parseFloat(balance)
    if (!isNumber) {
      setErrors({...errors, amount: 'Not a number'})
    } else if (!isValidAmount) {
      setErrors({...errors, amount: 'Insufficient funds'})
    } else {
      setErrors({...errors, amount: ''})
    }
  }

  const checkForErrors = () => {
    const isValidAddress = isAddress(toAddress)
    const asFloat = parseFloat(amount)
    const isNumber = !isNaN(parseFloat(amount))
    const isValidAmount = isNumber && asFloat <= parseFloat(balance)
    setErrors({
      toAddress: isValidAddress ? '' : 'Invalid address',
      amount: !isNumber
        ? 'Not a number'
        : !isValidAmount
        ? 'Insufficient funds'
        : '',
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    checkForErrors()
    if (errors.toAddress || errors.amount) return
    const formData = new FormData(e.target as HTMLFormElement)
    const to = formData.get('toAddress') as `0x${string}`
    const value = formData.get('value') as string
    sendTransaction({to, value: parseEther(value)})
  }

  // Format and update wallet balance once balanceResult.data is defined
  useEffect(() => {
    if (balanceResult.data) {
      const formattedBalance = formatUnits(
        balanceResult.data.value,
        balanceResult.data.decimals
      )
      setBalance(formattedBalance)
    }
  }, [balanceResult.data])

  return (
    <Card>
      <p>balance: {balance}</p>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          name="toAddress"
          placeholder="0x9Dd9...Cd2da"
          value={toAddress}
          onChange={handleToAddressChange}
          required
        />
        {errors.toAddress && <div>{errors.toAddress}</div>}
        <input
          name="value"
          placeholder="0.1"
          value={amount}
          onChange={handleAmountChange}
          required
        />
        {errors.amount && <div>{errors.amount}</div>}
        <Button type="submit" disabled={isSubmitDisabled}>
          {isPending ? 'Confirming...' : 'Send'}
        </Button>
        {hash && <div>Transaction hash: {hash}</div>}
        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed.</div>}
        {/* {error && (
          <div>Error: {(error as BaseError).shortMessage || error.message}</div>
        )} */}
      </form>
    </Card>
  )
}

export default SendTransaction
