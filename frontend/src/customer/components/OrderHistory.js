import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './order.module.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.orderHistoryContainer}>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className={styles.orderContainer}>
            <h2>Order ID: {order.id}</h2>
            <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
            <table className={styles.orderTable}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems.map(item => (
                  <tr key={item.id}>
                    <td>{item.product.name}</td>
                    <td>{item.quantity}</td>
                    <td>₱{item.product.price.toFixed(2)}</td>
                    <td>₱{item.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.totalAmount}>
              <span>Total Amount: ₱{order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        ))
      )}

      <div className={styles.addButtonContainer}>
        <Link to="/" className={styles.addNewOrderButton}>Add New Order</Link>
      </div>
    </div>
  );
};

export default OrderHistory;
