import React, { useState } from 'react';
import styles from './Signup.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { handleSignup } from '../../services/authservice';
import { getImageUrl } from '../../utils';

export const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+$/.test(email);
    const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);
    const validateUsername = (username) => username.length > 0 && username.length <= 16;

    const onSignup = async (e) => {
        e.preventDefault();
        setErrors({});

        let newErrors = {};

        if (!validateEmail(email)) newErrors.email = 'Invalid email format.';
        if (!validateUsername(username)) newErrors.username = 'Username must be between 1 and 16 characters.';
        if (!validatePassword(password)) newErrors.password = 'Password must include uppercase, lowercase, a number, and a special character.';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const { success, message } = await handleSignup(email, password, username);
            if (success) {
                alert('Account created! Please verify your email.');
                navigate('/signin');
            } else {
                setErrors({ firebase: message });
            }
        } catch (error) {
            setErrors({ firebase: error.message });
        }
    };

    return (
        <section className={styles.container}>
            <img src={getImageUrl("signup/signupLibrary.png")} alt="Signup Image" className={styles.heroImg} />

            <div className={styles.content}>
                <h1 className={styles.title}>Create an account</h1>
                <p className={styles.description}>Access your personalized book swapping experience.</p>

                <form onSubmit={onSignup}>
                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} required />
                        {errors.email && <p className={styles.error}>{errors.email}</p>}
                    </div>

                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={styles.input} required />
                        {errors.username && <p className={styles.error}>{errors.username}</p>}
                    </div>

                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} required />
                        {errors.password && <p className={styles.error}>{errors.password}</p>}
                    </div>

                    {errors.firebase && <p className={styles.error}>{errors.firebase}</p>}

                    <button type="submit" className={styles.loginBtn}>Create Account</button>
                </form>

                <p className={styles.registerPrompt}>
                    Already have an account? <Link to="/signin">Sign in</Link>
                </p>
            </div>
        </section>
    );
};
