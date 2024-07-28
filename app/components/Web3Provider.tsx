'use client'
import {WagmiProvider, createConfig, http} from 'wagmi'
import {sepolia} from 'wagmi/chains'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ConnectKitProvider, getDefaultConfig} from 'connectkit'
import {config as envConfig} from '@/config'

const config = createConfig(
  getDefaultConfig({
    chains: [sepolia],
    transports: {
      [sepolia.id]: http(envConfig.sepoliaRpcUrl),
    },
    walletConnectProjectId: envConfig.walletConnectProjectId,
    appName: 'Chain Beat',
  })
)

const queryClient = new QueryClient()

export const Web3Provider = ({children}: {children: React.ReactNode}) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
