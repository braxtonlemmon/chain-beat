'use client'

import {useState} from 'react'
import AddressLookup from './AddressLookup'
import AddressLookupDetails from './AddressLookupDetails'

function AddressLookupPage() {
  const [userAddress, setUserAddress] = useState('')
  const [hasValidAddress, setHasValidAddress] = useState(false)
  return (
    <>
      {hasValidAddress ? (
        <AddressLookupDetails userAddress={userAddress} />
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
