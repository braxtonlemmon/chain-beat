import Link from 'next/link'

function Header() {
  const links = [
    {
      href: '/address-lookup',
      label: 'ADDRESS LOOKUP',
    },
    {
      href: '/account',
      label: 'ACCOUNT',
    },
  ]

  return (
    <header className="bg-header font-notoSans">
      <nav className="mx-auto flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-[36px] font-fjalla">CHAIN BEAT</h1>
        </div>
        <div className="flex gap-4">
          {links.map((link) => {
            return (
              <Link
                key={link.href}
                href={link.href}
                className="border-double border-4 border-primaryText rounded-lg p-[6px] hover:scale-[1.05]"
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}

export default Header
