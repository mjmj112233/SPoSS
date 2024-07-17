import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import styles from './header.module.css';
import logoutIcon from './assets/logout.svg';

const Header = () => {
  const [user] = useAuthState(auth);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.sposs} onClick={handleLogoClick}>
        <Link to="/" className={styles.logoLink}>
          <h1>SPoSS</h1>
          <h2>Simple Point of Sales System</h2>
        </Link>
      </div>
      {user && (
        <div className={styles.categories}>
          {categories.map((category) => (
            <span key={category.id}>{category.name}</span>
          ))}
        </div>
      )}
      <div className={styles.navigation}>
        {user && (
          <div className={styles.orderHistoryButton}>
            <Link to="/order-history">
              <FontAwesomeIcon icon={faShoppingBasket} className={styles.orderHistoryIcon} />
            </Link>
          </div>
        )}
        {user ? (
          <div className={styles.logoutButton} onClick={handleLogout}>
            {/* <img src={logoutIcon} alt="Logout" /> */}
            <FontAwesomeIcon icon={faRightFromBracket} className={styles.logoutIcon} />
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
