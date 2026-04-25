import styles from './AccountCard.module.css'

function AccountCard({accountName, holdings}) {

    return (
        <>
            <div className={styles.card}>
                <h4 className={styles.text}>{accountName}</h4>
                <div id="account-details">
                    <h5 className={styles.text}>{holdings}</h5>
                </div>
            </div>
        </>
    )
}

export default AccountCard