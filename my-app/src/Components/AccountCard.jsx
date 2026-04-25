import { useNavigate } from 'react-router-dom';
import styles from './AccountCard.module.css'

function AccountCard({accountId, accountName, holdings, returns}) {
    const color = returns > 0 ? '#22c55e' : returns < 0 ? '#ef4444' : 'white';

    const navigate = useNavigate();

    return (
        <>
            <button onClick={() => navigate(`/accounts/${accountId}`)} className={styles.card}>
                <h4 className={styles.text}>{accountName}</h4>
                <div id="account-details">
                    <h5 className={styles.text}>{holdings}</h5>
                    <h5 className={styles.text} style={{color}}>{returns}</h5>
                </div>
            </button>
        </>
    )
}

export default AccountCard