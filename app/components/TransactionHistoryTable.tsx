import {ExternalLink} from 'react-feather'
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
      <table className="border-collapse table-fixed w-[950px]">
        <caption className="text-xl font-bold  my-2 pb-2">Transactions</caption>
        <thead>
          <tr>
            <th className=" w-1/6">Tx hash</th>
            <th className=" w-1/6">Amount</th>
            <th className=" w-1/6">Sender</th>
            <th className=" w-1/6">Receiver</th>
            <th className=" w-1/6">TimeStamp</th>
            <th className=" w-1/12">Etherscan</th>
          </tr>
        </thead>
        <tbody>
          {txHistory.map((tx, index) => {
            return (
              <tr
                key={tx.hash}
                className={`${index % 2 === 0 ? 'bg-tableRow' : ''}`}
              >
                <td>
                  <div className="flex justify-center items-center gap-2 p-1">
                    {truncateAddress(tx.hash)} <CopyItem textToCopy={tx.hash} />
                  </div>
                </td>
                <td className="text-start">
                  <div className="px-5">{tx.amount}</div>
                </td>
                <td>
                  <div className="flex justify-center items-center gap-2 p-1">
                    {truncateAddress(tx.sender)}
                    <CopyItem textToCopy={tx.sender} />
                  </div>
                </td>
                <td>
                  <div className="flex justify-center items-center gap-2 p-1">
                    {truncateAddress(tx.receiver)}
                    <CopyItem textToCopy={tx.receiver} />
                  </div>
                </td>
                <td className="text-center">{tx.date}</td>
                <td className="text-center">
                  <div className="flex items-center justify-center">
                    <a href={tx.url} rel="noopener noreferrer" target="_blank">
                      <ExternalLink size={20} />
                    </a>
                  </div>
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
