import {useState} from 'react'
import {ethers, isAddress} from 'ethers'

import Button from './shared/Button'
import Input from './shared/Input'

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
    <div className="container flex flex-col">
      <p>enter userAddress:</p>
      <Input
        name="userAddress"
        value={userAddress}
        setInputValue={setUserAddress}
      />
      {userAddress.length > 0 && isInvalid && <p>ERROR</p>}
      <Button onClick={() => handleSubmit()}>submit</Button>
    </div>
  )
}

export default AddressLookup
