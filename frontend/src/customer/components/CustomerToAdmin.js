import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../authentication/AuthContext';
import './customerToAdmin.css';

//button component to navigate to the admin dashboard if the user is an admin
const CustomerToAdminButton = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  // Function to handle the button click and navigate to the admin dashboard page
  const handleClick = () => {
    navigate('/admin');
  };

  // If the user is not an admin, don't render the button
  if (!isAdmin) return null;

  return (
    <div className="customerToAdminButton" onClick={handleClick}>
      <p className='label'>To Admin Dashboard</p>
      <FontAwesomeIcon icon={faUserTie} className="buttonIcon" />
    </div>
  );
};

export default CustomerToAdminButton;
