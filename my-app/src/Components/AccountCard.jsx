import { useNavigate } from 'react-router-dom';
import styles from './AccountCard.module.css'

function AccountCard({accountId, accountName, holdings, returns}) {
    const color = returns > 0 ? '#22c55e' : returns < 0 ? '#ef4444' : 'white';

    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(`/accounts/${accountId}`)} className={styles.card}>
            <div className={styles.name}>{accountName}</div>
            <div className={styles.details}>
                <div className={styles.detail}>
                    <span className={styles.label}>Holdings</span>
                    <span className={styles.value}>£{holdings}</span>
                </div>
                <div className={styles.detail}>
                    <span className={styles.label}>Returns</span>
                    <span className={styles.value} style={{ color }}>{returns}%</span>
                </div>
            </div>
        </button>
    )
}

export default AccountCard