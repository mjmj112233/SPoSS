import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminHomePage from './admin/pages/AdminHome';
import HomePage from './customer/user.pages/HomePage';
import Header from './customer/components/Header';

const App = () => {
  const [isAdminPage, setIsAdminPage] = useState(false);

  const togglePage = () => {
    setIsAdminPage(prevState => !prevState);
  };

  return (
    <Router>
      <Header />
      <main>
        <button onClick={togglePage}>Toggle Page</button>
        <Routes>
          <Route path="/" element={isAdminPage ? <AdminHomePage /> : <HomePage />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
