'use server'
import dynamic from 'next/dynamic'

const AccountPage = dynamic(() => import('../components/AccountPage'), {
  ssr: false,
})

export default async function Account() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AccountPage />
    </main>
  )
}
