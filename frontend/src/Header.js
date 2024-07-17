import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/config'; 
import styles from './header.module.css';
import logoutIcon from './assets/logout.svg';

const categories = ["Categ 1", "Categ 2", "Categ 3", "Categ 4", "Categ 5"];

const Header = () => {
  const [user] = useAuthState(auth);

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
          {categories.map((category, index) => (
            <span key={index}>{category}</span>
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
