import React from 'react';
import Products from '../components/Products';
import Receipt from '../components/Receipt';
import './homepage.css';

const HomePage = () => {
  return (
    <div className="container">
      <div className="products">
        <Products />
      </div>
      <div className="receipt">
        <Receipt />
      </div>
    </div>
  );
};

export default HomePage;
