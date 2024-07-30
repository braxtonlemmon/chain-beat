'use client'

import {useState} from 'react'
import AddressLookup from './AddressLookup'
import AddressLookupDetails from './AddressLookupDetails'

function AddressLookupPage() {
  const testAddress = '0x9Dd9416b27d94eE120eE0f30C1b67B8CF1DCd2da'
  const [userAddress, setUserAddress] = useState(testAddress)
  const [hasValidAddress, setHasValidAddress] = useState(false)

  const resetPage = () => {
    setUserAddress(testAddress)
    setHasValidAddress(false)
  }

  return (
    <>
      {hasValidAddress ? (
        <AddressLookupDetails userAddress={userAddress} resetPage={resetPage} />
      ) : (
        <AddressLookup
          userAddress={userAddress}
          setUserAddress={setUserAddress}
          setHasValidAddress={setHasValidAddress}
        />
      )}
    </>
  )
}

export default AddressLookupPage
