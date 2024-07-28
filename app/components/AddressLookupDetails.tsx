'use client'
import {ethers} from 'ethers'
import {useEffect, useState} from 'react'
import {getTransactions} from '../data/getTransactions'
import {config} from '@/config'

type TAddressLookupDetails = {
  userAddress: string
}

type TTransaction = {
  hash: string
  amount: string
  sender: string
  receiver: string
  timeStamp: string
  url: string
}

function AddressLookupDetails({userAddress}: TAddressLookupDetails) {
  const [balance, setBalance] = useState('')
  const [txHistory, setTxHistory] = useState<TTransaction[]>([])
  const [txListPage, setTxListPage] = useState(1)

  const handleNextPage = () => {
    if (txHistory.length === 10) {
      setTxListPage((prev) => prev + 1)
    }
  }

  const handlePrevPage = () => {
    if (txListPage > 1) {
      setTxListPage((prev) => prev - 1)
    }
  }

  // Fetch current ETH balance using entered user address
  useEffect(() => {
    // TODO: make server action
    const getBalance = async () => {
      const rpcUrl = config.sepoliaRpcUrl
      const provider = new ethers.JsonRpcProvider(rpcUrl)
      const balance = await provider.getBalance(userAddress)
      const formattedBalance = ethers.formatEther(balance)
      setBalance(formattedBalance)
    }
    getBalance()
  }, [userAddress])

  // (A) Fetch transactions and (B) setup polling to listen for new transactions (every 10 seconds) while user on page
  useEffect(() => {
    const getHistory = async () => {
      try {
        const transactionData = await getTransactions(txListPage, userAddress)
        const transactions = transactionData.result
        let formattedTransactions: TTransaction[] = []
        if (transactions.length > 1) {
          transactions.forEach((tx) => {
            const formattedTx: TTransaction = {
              hash: tx.hash,
              amount: tx.value,
              sender: tx.to,
              receiver: tx.from,
              timeStamp: tx.timeStamp,
              url: `https://sepolia.etherscan.io/tx/${tx.hash}`,
            }
            formattedTransactions.push(formattedTx)
          })
          setTxHistory(formattedTransactions)
        }
      } catch (error) {
        // TODO: Error handling
        console.error('problem fetching')
      }
    }

    getHistory()

    const interval = setInterval(() => {
      getHistory()
    }, 10000)

    return () => clearInterval(interval)
  }, [userAddress, txListPage])

  return (
    <div>
      <p>current balance: {balance}</p>
      <table className="border-collapse table-fixed w-[800px]">
        <thead>
          <tr>
            <th className="border border-black border-1 w-1/6">Tx hash</th>
            <th className="border border-black border-1 w-1/6">Amount</th>
            <th className="border border-black border-1 w-1/6">Sender</th>
            <th className="border border-black border-1 w-1/6">Receiver</th>
            <th className="border border-black border-1 w-1/6">TimeStamp</th>
            <th className="border border-black border-1 w-1/6">URL</th>
          </tr>
        </thead>
        <tbody>
          {txHistory.map((tx) => {
            return (
              <tr key={tx.hash}>
                <td className="border border-black border-1 break-words">
                  {tx.hash}
                </td>
                <td className="border border-black border-1 break-words">
                  {tx.amount}
                </td>
                <td className="border border-black border-1 break-words">
                  {tx.sender}
                </td>
                <td className="border border-black border-1 break-words">
                  {tx.receiver}
                </td>
                <td className="border border-black border-1 break-words">
                  {tx.timeStamp}
                </td>
                <td className="border border-black border-1 break-words">
                  <a href={tx.url}>{tx.url}</a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <p onClick={() => handlePrevPage()}>prev</p>
      <p onClick={() => handleNextPage()}>next</p>
      <p>{txListPage}</p>
    </div>
  )
}

export default AddressLookupDetails
