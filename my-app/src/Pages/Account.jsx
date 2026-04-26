import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import styles from './Account.module.css'

function Account() {
    const { id } = useParams();

      const [data, setData] = useState({ account: {}, totalHoldings: {}, holdings: {}, unrealisedReturns: {}, transactions: [] })
    
      useEffect(() => {
        const fetchData = async () => {
          const [accountRes, totalHoldingsRes, holdingsRes, unrealisedReturnsRes, transactionsRes] = await Promise.all([
            fetch(`https://localhost:7295/api/accounts/${id}`),
            fetch(`https://localhost:7295/api/holdings/overall/${id}`),
            fetch(`https://localhost:7295/api/holdings/${id}`),
            fetch(`https://localhost:7295/api/performance/unrealisedreturns/${id}`),
            fetch(`https://localhost:7295/api/transactions/${id}`)
          ])
    
          setData({
            account: await accountRes.json(),
            totalHoldings: await totalHoldingsRes.json(),
            holdings: await holdingsRes.json(),
            unrealisedReturns: await unrealisedReturnsRes.json(),
            transactions: await transactionsRes.json()
          })
        }
        fetchData()
      }, [])

    const returns = data.unrealisedReturns.unrealisedReturns;
    const returnsColor = returns > 0 ? '#22c55e' : returns < 0 ? '#ef4444' : '#e2e8f0';

    return (
        <div className={styles.background}>
            <div className={styles.headerblock}>
                <p className={styles.title}>Portfolio Manager</p>
                <p className={styles.subtitle}>{data.account.name}</p>
            </div>
            <div className={styles.content}>
                <div className={styles.topcontent}>
                    <div className={styles.smallbox}>
                        <p className={styles.boxtitle}>Total Holdings</p>
                        <p className={styles.value}>£{data.totalHoldings.holding}</p>
                    </div>
                    <div className={styles.smallbox}>
                        <p className={styles.boxtitle}>Cash</p>
                        <p className={styles.value}>£{data.account.cash}</p>
                    </div>
                    <div className={styles.smallbox}>
                        <p className={styles.boxtitle}>Unrealised Returns</p>
                        <p className={styles.value} style={{ color: returnsColor }}>{returns}%</p>
                    </div>
                </div>
                <div className={styles.bottomcontent}>
                    <div className={styles.largebox}>
                        <p className={styles.boxtitle}>Holdings</p>
                        <div className={styles.largebody}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.holdings.holdings?.map(holding => (
                                        <tr key={holding.security.securityId}>
                                            <td>{holding.security.securityName}</td>
                                            <td>{holding.holding}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={styles.largebox}>
                        <p className={styles.boxtitle}>Transactions</p>
                        <div className={styles.largebody}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Decision</th>
                                        <th>Qty</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.transactions?.map(transaction => (
                                        <tr key={transaction.transactionId}>
                                            <td>{transaction.security.securityName}</td>
                                            <td>
                                                <span className={`${styles.badge} ${styles[transaction.transactionType.typeDescription.toLowerCase()]}`}>
                                                    {transaction.transactionType.typeDescription}
                                                </span>
                                            </td>
                                            <td>{transaction.quantity}</td>
                                            <td>{transaction.securityPrice}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account