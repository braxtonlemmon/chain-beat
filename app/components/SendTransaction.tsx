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
import Input from './shared/Input'

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
      <p>Balance: {balance} Sepolia ETH</p>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <Input
          name="toAddress"
          label="Receiver address"
          placeholder="0x9Dd9...Cd2da"
          value={toAddress}
          onChange={handleToAddressChange}
          required
          setInputValue={setToAddress}
        />
        {errors.toAddress && <div>{errors.toAddress}</div>}
        <Input
          name="value"
          label="Amount to send"
          placeholder="0.1"
          value={amount}
          onChange={handleAmountChange}
          required
          setInputValue={setAmount}
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
