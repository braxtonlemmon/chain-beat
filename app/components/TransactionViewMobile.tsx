import {ExternalLink} from 'react-feather'
import {truncateAddress} from '../utils/truncateAddress'
import {TTransaction} from './AddressLookupDetails'
import CopyItem from './shared/CopyItem'
import Card from './shared/Card'

type TTransactionViewMobile = {
  tx: TTransaction
}

function TransactionViewMobile({tx}: TTransactionViewMobile) {
  return (
    <Card style={{paddingLeft: '16px', paddingRight: '16px'}}>
      <div className="flex flex-col [&>*:nth-child(odd)]:bg-tableRow w-full">
        <div className="mobile-transaction-row">
          <p>Tx hash</p>
          <div className="flex justify-center items-center gap-2 p-1">
            {truncateAddress(tx.hash)} <CopyItem textToCopy={tx.hash} />
          </div>
        </div>
        <div className="mobile-transaction-row">
          <p>Amount</p>
          <p>{tx.amount}</p>
        </div>
        <div className="mobile-transaction-row">
          <p>Sender</p>
          <div className="flex justify-center items-center gap-2 p-1">
            {truncateAddress(tx.sender)}
            <CopyItem textToCopy={tx.sender} />
          </div>
        </div>
        <div className="mobile-transaction-row">
          <p>Receiver</p>
          <div className="flex justify-center items-center gap-2 p-1">
            {truncateAddress(tx.receiver)}
            <CopyItem textToCopy={tx.receiver} />
          </div>
        </div>
        <div className="mobile-transaction-row">
          <p>TimeStamp</p>
          <p>{tx.date}</p>
        </div>
        <div className="mobile-transaction-row">
          <p>Etherscan</p>
          <div className="flex items-center">
            <a href={tx.url} rel="noopener noreferrer" target="_blank">
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default TransactionViewMobile
