import styles from './AccountCard.module.css'

function AccountCard({accountName, holdings, returns}) {
    const color = returns > 0 ? '#22c55e' : returns < 0 ? '#ef4444' : 'white';

    return (
        <>
            <div className={styles.card}>
                <h4 className={styles.text}>{accountName}</h4>
                <div id="account-details">
                    <h5 className={styles.text}>{holdings}</h5>
                    <h5 className={styles.text} style={{color}}>{returns}</h5>
                </div>
            </div>
        </>
    )
}

export default AccountCard