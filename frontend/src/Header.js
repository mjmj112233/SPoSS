import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/config'; 
import styles from './header.module.css';
import logoutIcon from './assets/logout.svg';

const Header = () => {
  const [user] = useAuthState(auth);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Function to fetch categories
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <header className={styles.header}>
      <div className={styles.sposs}>
        <h1>SPoSS</h1>
        <h2>Simple Point of Sales System</h2>
      </div>
      {user && (
        <div className={styles.categories}>
          {categories.map((category) => (
            <span key={category.id}>{category.name}</span>
          ))}
        </div>
      )}
      <div className={styles.navigation}>
        {user ? (
          <div className={styles.logoutButton} onClick={handleLogout}>
            <img src={logoutIcon} alt="Logout" />
          </div>
        ) : (
          <div className={styles.loginRegister}>
            <Link to="/login" className={styles.loginLink}>Login</Link>
            <Link to="/register" className={styles.registerLink}>Register</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
