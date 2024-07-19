import React from 'react';
import ManageProduct from '../components/ManageProduct';
import ManageCategory from '../components/ManageCategory';
import AdminToCustomerButton from '../components/AdminToCustomerButton';
import './admin.home.css';

//main dashboard for the admin user
const AdminHomePage = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      
      {/* Component for managing products */}
      <ManageProduct />
      
      {/* Component for managing categories */}
      <ManageCategory />
      
      {/* Button to switch view to customer mode */}
      <AdminToCustomerButton />
    </div>
  );
};

export default AdminHomePage;
