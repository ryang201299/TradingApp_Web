import { useState, useEffect } from 'react'
import AccountCard from '../Components/AccountCard.jsx'
import styles from './Accounts.module.css'

function Accounts() {
  const [data, setData] = useState({ accounts: [], holdings: [], performance: [] })

  useEffect(() => {
    const fetchData = async () => {
      const [accountsRes, accountHoldingsRes, accountPerformanceRes] = await Promise.all([
        fetch('https://tradingappapi.azurewebsites.net/api/accounts'),
        fetch('https://tradingappapi.azurewebsites.net/api/holdings/overall'),
        fetch('https://tradingappapi.azurewebsites.net/api/performance/unrealisedreturns')
      ])

      setData({
        accounts: await accountsRes.json(),
        holdings: await accountHoldingsRes.json(),
        performance: await accountPerformanceRes.json()
      })
    }
    fetchData()
  }, [])

  return (
    <div className={styles.background}>
        <div className={styles.headerblock}>
            <p className={styles.title}>Portfolio Manager</p>
        </div>
        <div className={styles.accountcards}>
        {data.accounts.map(account => {
          const holding = data.holdings.find(h => h.account.accountId === account.accountId)?.holding;
          const performance = data.performance.find(p => p.account.accountId === account.accountId)?.unrealisedReturns;

          return (
          <AccountCard
              key={account.accountId}
              accountId={account.accountId}
              accountName={account.name}
              holdings={holding}
              returns={performance}
          />
          );
        })}
      </div>
    </div>
  );
}

export default Accounts