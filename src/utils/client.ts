import { createPublicClient, http } from 'viem'
import { polygonZkEvmCardona } from 'viem/chains'
import { createWalletClient, custom } from 'viem'

declare global {
  interface Window {
    ethereum?: any;
  }
}
 
export const publicClient = createPublicClient({ 
  chain: polygonZkEvmCardona, 
  transport: http(), 
}) 
const [account] = await window.ethereum!.request({ method: 'eth_requestAccounts' })
 
export const walletClient = createWalletClient({
  chain: polygonZkEvmCardona,
  transport: custom(window?.ethereum!),
  account
})