// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminHomePage from './admin/pages/AdminHome';
import HomePage from './customer/user.pages/HomePage';
import Header from './Header';
import Login from './authentication/Login';
import Register from './authentication/Register';
import PrivateRoute from './PrivateRoute';

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
        </Routes>
      </main>
    </Router>
  );
};

export default App;
