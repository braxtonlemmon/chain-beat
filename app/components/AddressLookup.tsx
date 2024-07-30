import {useState} from 'react'
import {ethers, isAddress} from 'ethers'

import Button from './shared/Button'
import Input from './shared/Input'
import Card from './shared/Card'

type TAddressLookup = {
  userAddress: string
  setUserAddress: (userAddress: string) => void
  setHasValidAddress: (hasAuth: boolean) => void
}

function AddressLookup({
  userAddress,
  setUserAddress,
  setHasValidAddress,
}: TAddressLookup) {
  const [isInvalid, setIsInvalid] = useState(false)

  // Checks if entered address is valid Ethereum userAddress
  const handleSubmit = async () => {
    const isValid = isAddress(userAddress)
    setIsInvalid(!isValid)
    if (isValid) {
      setHasValidAddress(true)
    }
  }

  return (
    <Card style={{width: '500px'}}>
      <p>Enter wallet address:</p>
      <Input
        name="userAddress"
        value={userAddress}
        setInputValue={setUserAddress}
      />
      {userAddress.length > 0 && isInvalid && <p>ERROR</p>}
      <Button
        onClick={() => handleSubmit()}
        disabled={userAddress.length === 0}
      >
        Submit
      </Button>
    </Card>
  )
}

export default AddressLookup
