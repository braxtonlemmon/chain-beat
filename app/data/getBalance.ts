import {config} from '@/config'
import {ethers} from 'ethers'

export async function getBalance(userAddress: string): Promise<string> {
  const rpcUrl = config.sepoliaRpcUrl
  const provider = new ethers.JsonRpcProvider(rpcUrl)
  const balanceAsBigInt = await provider.getBalance(userAddress)
  const balanceAsString = ethers.formatEther(balanceAsBigInt)
  const formattedBalance = Number(balanceAsString).toFixed(4)
  return formattedBalance
}
