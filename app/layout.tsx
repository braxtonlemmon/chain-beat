import type {Metadata} from 'next'
import './globals.css'
import {Web3Provider} from './components/Web3Provider'
import Header from './components/Header'
import {notoSans, fjallaOne} from './fonts'

export const metadata: Metadata = {
  title: 'Chain Beat',
  description:
    'Application with basic Web3 features for Validation Cloud tech assessment.',
  authors: [{name: 'Braxton Lemmon'}],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <link
        rel="icon"
        href="/icon?<generated>"
        type="image/<generated>"
        sizes="<generated>"
      />
      <body className={`${notoSans.variable} ${fjallaOne.variable}`}>
        <Header />
        <Web3Provider>
          <main className="flex flex-col items-center justify-between px-24 py-8 font-notoSans">
            {children}
          </main>
        </Web3Provider>
      </body>
    </html>
  )
}
