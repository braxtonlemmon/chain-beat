'use client'
import {Suspense, useEffect, useState} from 'react'
import {ethers} from 'ethers'
import {Copy} from 'react-feather'

import {getTransactions} from '../data/getTransactions'
import {truncateAddress} from '../utils/truncateAddress'
import {getBalance} from '../data/getBalance'
import Card from './shared/Card'
import Button from './shared/Button'
import CopyItem from './CopyItem'
import TransactionHistoryTable from './TransactionHistoryTable'

type TAddressLookupDetails = {
  userAddress: string
  resetPage: () => void
}

export type TTransaction = {
  hash: string
  amount: string
  sender: string
  receiver: string
  date: string
  url: string
}

function AddressLookupDetails({userAddress, resetPage}: TAddressLookupDetails) {
  const [balance, setBalance] = useState('')
  const [txHistory, setTxHistory] = useState<TTransaction[]>([])
  const [txListPage, setTxListPage] = useState(1)

  const SEPOLIA_DECIMALS = 18
  const NUM_ITEMS_PER_PAGE = 10

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleNextPage = () => {
    if (txHistory.length === NUM_ITEMS_PER_PAGE) {
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
    const fetchBalance = async () => {
      const formattedBalance = await getBalance(userAddress)
      setBalance(formattedBalance)
    }
    fetchBalance()
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
            const date = new Date(Number(tx.timeStamp) * 1000)
            const formattedDate = date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
            const formattedAmount = ethers.formatUnits(
              tx.value,
              SEPOLIA_DECIMALS
            )
            const formattedTx: TTransaction = {
              hash: tx.hash,
              amount: formattedAmount,
              sender: tx.to,
              receiver: tx.from,
              date: formattedDate,
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
      <Card>
        <h3>Transaction History</h3>
        <p>Wallet address: {truncateAddress(userAddress)}</p>
        <p>Current balance: {balance} Sepolia ETH</p>
        <Button onClick={() => resetPage()}>Reset</Button>
      </Card>
      <TransactionHistoryTable txHistory={txHistory} />
      <div className="w-full justify-evenly flex">
        <Button onClick={() => handlePrevPage()} disabled={txListPage === 1}>
          prev
        </Button>
        <Button
          onClick={() => handleNextPage()}
          disabled={txHistory.length < NUM_ITEMS_PER_PAGE}
        >
          next
        </Button>
      </div>
    </div>
  )
}

export default AddressLookupDetails
