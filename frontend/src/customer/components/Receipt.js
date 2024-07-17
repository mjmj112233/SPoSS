import React from 'react';
import styles from './receipt.module.css';

const Receipt = () => {
  const products = [
    { id: 1, name: 'Product 1', price: 149, quantity: 2 },
    { id: 2, name: 'Product 2', price: 299, quantity: 1 },
    { id: 3, name: 'Product 3', price: 349, quantity: 3 },
    { id: 4, name: 'Product 4', price: 499, quantity: 1 },
    { id: 5, name: 'Product 5', price: 199, quantity: 2 },
  ];

  const calculateAmount = (price, quantity) => {
    return price * quantity;
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => total + calculateAmount(product.price, product.quantity), 0);
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
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.quantity}</td>
              <td>{product.name}</td>
              <td>₱{product.price}</td>
              <td>₱{calculateAmount(product.price, product.quantity)}</td>
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
    </div>
  );
};

export default Receipt;
