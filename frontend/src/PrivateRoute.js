import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/config';

const PrivateRoute = ({ children, adminOnly }) => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.email !== 'sposs.admin@email.com') {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
