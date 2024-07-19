import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/config';

// PrivateRoute component ensures that only authenticated users can access the wrapped components. 
// It also allows for an admin-only paths.

const PrivateRoute = ({ children, adminOnly }) => {
  const [user, loading, error] = useAuthState(auth); // Hook to get the current authenticated user, loading, and error state

  // loading indicator
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's an error or no user is authenticated, redirect to login page
  if (error || !user) {
    return <Navigate to="/login" />;
  }

  // If the route is admin-only and the authenticated user is not the admin, redirect to home page
  if (adminOnly && user.email !== 'sposs.admin@email.com') {
    return <Navigate to="/" />;
  }

  // If all checks pass, render the children component(s)
  return children;
};

export default PrivateRoute;
