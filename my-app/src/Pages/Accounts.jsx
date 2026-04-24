import { useState, useEffect } from 'react'
import AccountCard from '../Components/AccountCard.jsx'
import styles from './Accounts.module.css'

function Accounts() {
  // const [accounts, setAccounts] = useState([])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const [accountsRes, securitiesRes, securityPricesRes, transactionsRes] = await Promise.all([
  //       fetch('https://localhost:7295/api/accounts'),
  //     ])
  //     setAccounts(await accountsRes.json())
  //     setSecurities(await securitiesRes.json())
  //     setSecurityPrices(await securityPricesRes.json())
  //   }
  //   fetchData()
  // }, [])

return (
    <div className={styles.background}>
        <AccountCard accountName="ISA" holdings="10,000" />
        <AccountCard accountName="LISA" holdings="16,000" />
        <AccountCard accountName="Savings" holdings="8,000" /> 
    </div>
  )
}

export default Accounts