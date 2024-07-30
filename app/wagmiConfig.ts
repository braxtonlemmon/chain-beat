import {http, createConfig} from 'wagmi'
import {sepolia, mainnet, optimism} from 'wagmi/chains'
import {injected, metaMask, safe, walletConnect} from 'wagmi/connectors'
import {config as envConfig} from '@/config'

const projectId = envConfig.walletConnectProjectId

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [walletConnect({projectId})],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(envConfig.sepoliaRpcUrl),
  },
})
