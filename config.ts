// Config object that contains all the environment variables
export const config = {
  etherscanApiKey: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY || '',
  walletConnectProjectId:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  sepoliaRpcUrl: process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || '',
  coinmarketcapApiKey: process.env.NEXT_PUBLIC_COINMARKETCAP_API_KEY || '',
}
