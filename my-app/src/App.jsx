import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [accounts, setAccounts] = useState([])
  const [securities, setSecurities] = useState([])
  const [securityPrices, setSecurityPrices] = useState([])
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      var [accountsRes, securitiesRes, securityPricesRes, transactionsRes] = await Promise.all([
        fetch('https://localhost:7295/api/accounts'),
        fetch('https://localhost:7295/api/securities'),
        fetch('https://localhost:7295/api/securityprices'),
        fetch('https://localhost:7295/api/transactions')
      ]);

      const accountsJson = await accountsRes.json();
      const securitiesJson = await securitiesRes.json();
      const securityPricesJson = await securityPricesRes.json();
      const transactionsJson = await transactionsRes.json();

      setAccounts(accountsJson);
      setSecurities(securitiesJson);
      setSecurityPrices(securityPricesJson);
      setTransactions(transactionsJson);
    };

    fetchData();
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Portfolio Dashboard</h1>
      </header>

      <main className="dashboard">

        <section className="card">
          <h2 className="card-title">Accounts</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map(account => (
                <tr key={account.accountId}>
                  <td>{account.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="card">
          <h2 className="card-title">Securities</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {securities.map(security => (
                <tr key={security.securityId}>
                  <td>{security.securityName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="card">
          <h2 className="card-title">Security Prices</h2>
          <table className="data-table">
            <colgroup>
              <col />
              <col style={{ width: '120px' }} />
            </colgroup>
            <thead>
              <tr>
                <th>Security</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {securityPrices.map(securityPrice => (
                <tr key={securityPrice.securityId}>
                  <td>{securityPrice.security.securityName}</td>
                  <td className="price">${securityPrice.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="card wide">
          <h2 className="card-title">Transactions</h2>
          <table className="data-table">
            <colgroup>
              <col />
              <col style={{ width: '100px' }} />
              <col />
              <col style={{ width: '120px' }} />
              <col style={{ width: '80px' }} />
            </colgroup>
            <thead>
              <tr>
                <th>Account</th>
                <th>Type</th>
                <th>Security</th>
                <th>Price</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.transactionId}>
                  <td>{transaction.account.name}</td>
                  <td><span className="badge">{transaction.transactionType.typeDescription}</span></td>
                  <td>{transaction.security.securityName}</td>
                  <td className="price">${transaction.securityPrice}</td>
                  <td>{transaction.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

      </main>
    </div>
  )
}

export default App