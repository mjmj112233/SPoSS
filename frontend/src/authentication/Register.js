import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import styles from './register.module.css';

// Register component for new user registration
const Register = () => {
    // State to hold email, password, and confirm password inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            // Register the user with Firebase
            await createUserWithEmailAndPassword(auth, email, password);
            // Redirect to home page on success
            navigate('/');
        } catch (err) {
            // Set error message on failure
            setError(err.message);
        }
    };

    return (
        <div>
            <form className={styles.registerForm} onSubmit={handleSubmit}>
                <h2>SPoSS Register</h2>
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
                <div>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Display error message if any */}
                {error && <p style={{ color: 'red', textAlign: 'center', fontSize: '12px' }}>{error}</p>}

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
