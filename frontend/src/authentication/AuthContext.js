import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

// Create a context to hold authentication state
const AuthContext = createContext();

// component to wrap around parts of the app that need authentication state
export const AuthProvider = ({ children }) => {
  // State to hold the authenticated user
  const [user, setUser] = useState(null);
  // State to determine if the user is an admin
  const [isAdmin, setIsAdmin] = useState(false);

  // Effect to monitor authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      // Check if the authenticated user is the admin
      setIsAdmin(user?.email === 'sposs.admin@email.com');
    });

    return () => unsubscribe();
  }, []);

  return (
    // Provide the authentication state and admin status to children components
    <AuthContext.Provider value={{ user, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the authentication context
export const useAuth = () => useContext(AuthContext);
