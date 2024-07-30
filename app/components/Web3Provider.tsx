'use client'
import {WagmiProvider, createConfig, http} from 'wagmi'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {config} from '../wagmiConfig'

const queryClient = new QueryClient()

export const Web3Provider = ({children}: {children: React.ReactNode}) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
