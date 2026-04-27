import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import './OrderModal.css';

const MOCK_SECURITIES = [
    { id: 1, name: 'Apple Inc.', price: 189.43 },
    { id: 2, name: 'Tesla Inc.', price: 241.10 },
    { id: 3, name: 'Microsoft Corp.', price: 415.22 },
];

function OrderModal({ show, onClose }) {
    const [order, setOrder] = useState({ type: 'buy', securityId: '', quantity: '' });

    const selected = MOCK_SECURITIES.find(s => s.id === parseInt(order.securityId)) ?? null;
    const total = selected && order.quantity ? (selected.price * Number(order.quantity)).toFixed(2) : null;
    const canSubmit = order.securityId && order.quantity && Number(order.quantity) > 0;

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
                            {MOCK_SECURITIES.map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
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
                            value={selected ? `£${selected.price.toFixed(2)}` : '—'}
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
                        <span className="order-total-value">{total ? `£${Number(total).toLocaleString('en-GB', { minimumFractionDigits: 2 })}` : '—'}</span>
                    </div>

                </div>

                <div className="order-footer">
                    <button className="order-cancel" onClick={onClose}>Cancel</button>
                    <button className={`order-submit ${order.type} ${!canSubmit ? 'disabled' : ''}`}
                        disabled={!canSubmit}>
                        Confirm {order.type}
                    </button>
                </div>

            </div>
        </Modal>
    );
}

export default OrderModal;