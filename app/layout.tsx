import type {Metadata} from 'next'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
          <main className="flex flex-col items-center justify-between p-6 md:px-24 md:py-8 md:pb-20 font-notoSans">
            <ToastContainer
              position="bottom-left"
              limit={1}
              autoClose={10000}
            />
            {children}
          </main>
        </Web3Provider>
      </body>
    </html>
  )
}
