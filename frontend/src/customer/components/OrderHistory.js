import React from 'react';
import { Link } from 'react-router-dom';
import styles from './order.module.css';

const orders = [
  {
    id: 1,
    customer_uid: 'some-customer-uid',
    orderItems: [
      {
        id: 1,
        product: {
          id: 1,
          name: 'Smoked Gouda and Truffle Fries',
          category: { id: 2, name: 'Food' },
          price: 330.00,
          image: null
        },
        price: 1980.00,
        quantity: 6
      },
      {
        id: 2,
        product: {
          id: 2,
          name: 'Salmon Mentaiko',
          category: { id: 2, name: 'Food' },
          price: 475.00,
          image: null
        },
        price: 475.00,
        quantity: 1
      },
      {
        id: 3,
        product: {
          id: 3,
          name: 'Angus Sourdough Burger',
          category: { id: 2, name: 'Food' },
          price: 565.00,
          image: null
        },
        price: 565.00,
        quantity: 1
      }
    ],
    orderDate: '2024-07-16T10:00:00',
    totalAmount: 3020.00
  }
];

const OrderHistory = () => {
  return (
    <div className={styles.orderHistoryContainer}>
      {orders.map(order => (
        <div key={order.id} className={styles.orderContainer}>
          <h2>Order ID: {order.id}</h2>
          <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
          <table className={styles.orderTable}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map(item => (
                <tr key={item.id}>
                  <td>{item.product.name}</td>
                  <td>{item.quantity}</td>
                  <td>₱{item.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.totalAmount}>
            <span>Total Amount: ₱{order.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      ))}
      
      <div className={styles.addButtonContainer}>
        <Link to="/" className={styles.addNewOrderButton}>Add New Order</Link>
      </div>
    </div>
  );
};

export default OrderHistory;
