import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../authentication/AuthContext';
import './adminToCustomer.css';

//button component to navigate to the customer page if the user is an admin
const AdminToCustomerButton = () => {
    const navigate = useNavigate();
    const { isAdmin } = useAuth();

    // Function to handle the button click and navigate to the home page
    const handleClick = () => {
        navigate('/');
    };

    // If the user is not an admin, don't render the button
    if (!isAdmin) return null;

    return (
        <div className="adminToCustomerButton" onClick={handleClick}>
            <p className='label'>View as Customer</p>
            <FontAwesomeIcon icon={faUser} className="buttonIcon" />
        </div>
    );
};

export default AdminToCustomerButton;
