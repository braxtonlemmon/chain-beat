import {truncateAddress} from '../utils/truncateAddress'
import {TTransaction} from './AddressLookupDetails'
import CopyItem from './CopyItem'
import Card from './shared/Card'

type TTransactionHistoryTable = {
  txHistory: TTransaction[]
}

function TransactionHistoryTable({txHistory}: TTransactionHistoryTable) {
  return (
    <Card>
      <table className="border-collapse table-fixed w-[1200px]">
        <caption>Transactions</caption>
        <thead>
          <tr>
            <th className="border border-black border-1 w-1/6">Tx hash</th>
            <th className="border border-black border-1 w-1/6">Amount</th>
            <th className="border border-black border-1 w-1/6">Sender</th>
            <th className="border border-black border-1 w-1/6">Receiver</th>
            <th className="border border-black border-1 w-1/12">TimeStamp</th>
            <th className="border border-black border-1 w-1/12">URL</th>
          </tr>
        </thead>
        <tbody>
          {txHistory.map((tx) => {
            return (
              <tr key={tx.hash}>
                <td className="border border-black border-1 break-words">
                  <div className="flex justify-center items-center gap-2 p-1">
                    {truncateAddress(tx.hash)} <CopyItem textToCopy={tx.hash} />
                  </div>
                </td>
                <td className="border border-black border-1 break-words text-start">
                  <div className="px-5">{tx.amount}</div>
                </td>
                <td className="border border-black border-1 break-words">
                  <div className="flex justify-center items-center gap-2 p-1">
                    {truncateAddress(tx.sender)}
                    <CopyItem textToCopy={tx.sender} />
                  </div>
                </td>
                <td className="border border-black border-1 break-words">
                  <div className="flex justify-center items-center gap-2 p-1">
                    {truncateAddress(tx.receiver)}
                    <CopyItem textToCopy={tx.receiver} />
                  </div>
                </td>
                <td className="border border-black border-1 break-words text-center">
                  {tx.date}
                </td>
                <td className="border border-black border-1 break-words text-center">
                  <a href={tx.url}>Link</a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Card>
  )
}

export default TransactionHistoryTable
