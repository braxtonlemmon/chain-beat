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
    <div className="m-3 row-start-1">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Transaction history lookup
      </h2>

      <Card>
        <Input
          name="userAddress"
          value={userAddress}
          setInputValue={setUserAddress}
          placeholder="0x9Dd9...Cd2da"
          label="Enter wallet address:"
        />
        {userAddress.length > 0 && isInvalid && <p>ERROR</p>}
        <Button
          onClick={() => handleSubmit()}
          disabled={userAddress.length === 0}
        >
          Submit
        </Button>
      </Card>
    </div>
  )
}

export default AddressLookup
