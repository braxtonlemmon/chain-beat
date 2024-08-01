import Link from 'next/link'
import logo from '../../public/icon.svg'
import Image from 'next/image'

function Header() {
  const links = [
    {
      href: '/address-lookup',
      label: 'TRANSACTIONS',
    },
    {
      href: '/account',
      label: 'ACCOUNT',
    },
  ]

  return (
    <header className="bg-header font-notoSans">
      <nav className="mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex gap-3 items-center select-none">
          <div className="block md:hidden">
            <Image priority src={logo} alt="Chain Beat logo" height={42} />
          </div>
          <div className="hidden md:block">
            <Image priority src={logo} alt="Chain Beat logo" height={36} />
          </div>
          <h1 className="text-2xl md:text-[36px] font-fjalla text-center">
            CHAIN BEAT
          </h1>
        </div>
        <div className="flex gap-4">
          {links.map((link) => {
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm md:text-md border-solid border-2 border-primaryText rounded-lg p-2 m:p-[6px] hover:scale-[1.03] transition-all text-center flex items-center justify-center bg-primaryText text-cardBackground m:px-4"
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
