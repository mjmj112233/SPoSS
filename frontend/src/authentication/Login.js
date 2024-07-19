import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';

// Login component for user authentication
const Login = () => {
  // State to hold email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Authenticate the user with Firebase
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect based on admin credentials
      if (email === 'sposs.admin@email.com' && password === 'admin123') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      // Set error message on failure
      setError(err.message);
    }
  };

  return (
    <div className={styles.loginForm}>
      <h2>SPoSS Login</h2>
      <p style={{ color: 'gray', textAlign: 'center', fontSize: '12px', marginBottom: '30px' }}>
        Admin access: [Email: sposs.admin@email.com] [Password: admin123]
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Display error message if any */}
        {error && <p style={{ color: 'red', textAlign: 'center', fontSize: '12px' }}>{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
