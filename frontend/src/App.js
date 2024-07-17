import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminHomePage from './admin/pages/AdminHome';
import HomePage from './customer/user.pages/HomePage';
import Header from './Header';
import Login from './authentication/Login';
import Register from './authentication/Register';
import PrivateRoute from './PrivateRoute';
import OrderHistory from './customer/components/OrderHistory'; 

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<PrivateRoute adminOnly={true}><AdminHomePage /></PrivateRoute>} />
          <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/order-history" element={<PrivateRoute><OrderHistory /></PrivateRoute>} /> {/* Route for OrderHistory */}
        </Routes>
      </main>
    </Router>
  );
};

export default App;
