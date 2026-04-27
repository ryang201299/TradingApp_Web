import { Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import './OrderModal.css';

function OrderModal({ show, onClose, accountId }) {
    const [securities, setSecurities] = useState([]);
    const [securityPrices, setSecurityPrices] = useState([]);
    const [order, setOrder] = useState({ type: '', securityId: '', quantity: '' });

    useEffect(() => {
        if (!show) return;

        let cancelled = false;

        const fetchData = async () => {
            const [securitiesRes, securityPricesRes] = await Promise.all([
                fetch('https://tradingappapi.azurewebsites.net/api/securities'),
                fetch('https://tradingappapi.azurewebsites.net/api/securityprices'),
            ]);

            if (cancelled) return;

            setSecurities(await securitiesRes.json());
            setSecurityPrices(await securityPricesRes.json());
        };

        fetchData();
        return () => { cancelled = true; };
    }, [show]);

    const selectedPrice = securityPrices.find(
        sp => sp.securityId === parseInt(order.securityId)
    ) ?? null;

    const total = selectedPrice && order.quantity
        ? (selectedPrice.price * Number(order.quantity)).toFixed(2)
        : null;

    const canSubmit = order.type && order.securityId && order.quantity && Number(order.quantity) > 0;

    const handleSubmit = async () => {
        if (!canSubmit) return;

        await fetch(`https://tradingappapi.azurewebsites.net/api/transactions/${order.type}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                accountId: accountId,
                securityId: parseInt(order.securityId),
                quantity: parseInt(order.quantity),
            }),
        });

        onClose();
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <div className="order-modal">

                <div className="order-header">
                    <span className="order-title">Place Order</span>
                    <button className="order-close" onClick={onClose}>✕</button>
                </div>

                <div className="order-body">

                    <div className="order-field">
                        <label className="order-label">Security</label>
                        <select className="order-input" value={order.securityId}
                            onChange={e => setOrder({ ...order, securityId: e.target.value })}>
                            <option value="">Select a security...</option>
                            {securities.map(s => (
                                <option key={s.securityId} value={s.securityId}>{s.securityName}</option>
                            ))}
                        </select>
                    </div>

                    <div className="order-field">
                        <label className="order-label">Order Type</label>
                        <div className="order-toggle">
                            <button className={`toggle-btn buy ${order.type === 'buy' ? 'active' : ''}`}
                                onClick={() => setOrder({ ...order, type: 'buy' })}>Buy</button>
                            <button className={`toggle-btn sell ${order.type === 'sell' ? 'active' : ''}`}
                                onClick={() => setOrder({ ...order, type: 'sell' })}>Sell</button>
                        </div>
                    </div>

                    <div className="order-field">
                        <label className="order-label">Current Price</label>
                        <input className="order-input order-readonly"
                            value={selectedPrice ? `£${selectedPrice.price.toFixed(2)}` : '—'}
                            readOnly />
                    </div>

                    <div className="order-field">
                        <label className="order-label">Quantity</label>
                        <input className="order-input" type="number" min="1" placeholder="0"
                            value={order.quantity}
                            onChange={e => setOrder({ ...order, quantity: e.target.value })} />
                    </div>

                    <div className="order-total">
                        <span className="order-label" style={{ margin: 0 }}>Estimated Total</span>
                        <span className="order-total-value">
                            {total ? `£${Number(total).toLocaleString('en-GB', { minimumFractionDigits: 2 })}` : '—'}
                        </span>
                    </div>

                </div>

                <div className="order-footer">
                    <button className="order-cancel" onClick={onClose}>Cancel</button>
                    <button
                        className={`order-submit ${order.type} ${!canSubmit ? 'disabled' : ''}`}
                        disabled={!canSubmit}
                        onClick={handleSubmit}>
                        Confirm {order.type}
                    </button>
                </div>

            </div>
        </Modal>
    );
}

export default OrderModal;