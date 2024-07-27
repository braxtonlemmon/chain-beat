import AddressLookupPage from './components/AddressLookupPage'

// Page where user can enter address and view current balance and recent transactions
export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AddressLookupPage />
    </main>
  )
}

// userAddress: 0x9Dd9416b27d94eE120eE0f30C1b67B8CF1DCd2da
