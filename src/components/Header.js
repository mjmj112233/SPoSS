import React from 'react';
import styles from './header.module.css';
import logoutIcon from '../assets/logout.svg';

const categories = ["Categ 1", "Categ 2", "Categ 3", "Categ 4", "Categ 5"];

const Header = () => (
  <header className={styles.header}>

    <div className={styles.sposs}>
      <h1>SPoSS</h1>
      <h2>Simple Point of Sales System</h2>
    </div>

    <div className={styles.categories}>
      {categories.map((category, index) => (
        <span key={index}>{category}</span>
      ))}
    </div>

    <div className={styles.logoutButton}>
      <img src={logoutIcon} alt="Logout" />
    </div>
    
  </header>
);

export default Header;
