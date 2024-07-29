import Link from 'next/link'

function Header() {
  return (
    <header className="bg-white">
      <nav className="mx-auto flex items-center justify-between p-6">
        <div>
          <h1 className="text-2xl font-bold">Chain Beat</h1>
        </div>
        <div className="flex gap-4">
          <Link href="/address-lookup">Address Lookup</Link>
          <Link href="/account">Account</Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
