import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './receipt.module.css';

const Receipt = ({ selectedItems }) => {
    const calculateAmount = (price, quantity) => {
        return price * quantity;
    };

    const calculateTotal = () => {
        return selectedItems.reduce((total, item) => total + calculateAmount(item.price, item.quantity), 0);
    };

    const navigate = useNavigate();

    const handleCreateOrder = () => {
        if (selectedItems.length > 0) {
            navigate('/order-history');
        } else {
            alert('Please add at least one product to create an order.');
        }
    };

    return (
        <div className={styles.receiptContainer}>
            <p>Order Receipt</p>
            <table className={styles.receiptTable}>
                <thead>
                    <tr>
                        <th>Qty</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.quantity}</td>
                            <td>{item.name}</td>
                            <td>₱{item.price}</td>
                            <td>₱{calculateAmount(item.price, item.quantity)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={styles.total}>
                <div className={styles.divider}>---------------------------------------------------</div>
                <div className={styles.totalAmount}>
                    <span>TOTAL</span>
                    <span>₱{calculateTotal()}</span>
                </div>
            </div>

            <div className={styles.buttonContainer}>
                <button className={styles.createOrderButton} onClick={handleCreateOrder}>Create Order</button>
            </div>
        </div>
    );
};

export default Receipt;
