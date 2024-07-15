import React from 'react';
import ManageProduct from '../components/ManageProduct';
import ManageCategory from '../components/ManageCategory';
import './admin.home.css'

const AdminHomePage = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
        <ManageProduct />
        <ManageCategory />
    </div>
  );
};

export default AdminHomePage;
