'use server'
import dynamic from 'next/dynamic'

const AccountPage = dynamic(() => import('../components/AccountPage'), {
  ssr: false,
})

// Page where user can connect wallet, execute send transaction, and view current token prices
export default async function Account() {
  return <AccountPage />
}
