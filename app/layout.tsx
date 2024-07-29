import type {Metadata} from 'next'
import {Noto_Sans} from 'next/font/google'
import './globals.css'
import {Web3Provider} from './components/Web3Provider'
import Header from './components/Header'

const notoSans = Noto_Sans({subsets: ['latin']})

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
      <body className={notoSans.className}>
        <Header />
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  )
}
