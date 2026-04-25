import { useState, useEffect } from 'react'
import AccountCard from '../Components/AccountCard.jsx'
import styles from './Accounts.module.css'

function Accounts() {
  const [accounts, setAccounts] = useState([])
  const [accountHoldings, setAccountHoldings] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const [accountsRes, accountHoldingsRes] = await Promise.all([
        fetch('https://localhost:7295/api/accounts'),
        fetch('https://localhost:7295/api/holdings')
      ])
      setAccounts(await accountsRes.json())
      setAccountHoldings(await accountHoldingsRes.json())
    }
    fetchData()
  }, [])

  return (
    <div className={styles.background}>
      {accounts.map(account => {
        const holding = accountHoldings.find(h => h.account.accountId === account.accountId).holding;

        return (
          <AccountCard
            key={account.accountId}
            accountName={account.name}
            holdings={holding}
          />
        );
      })}
    </div>
  );
}

export default Accounts