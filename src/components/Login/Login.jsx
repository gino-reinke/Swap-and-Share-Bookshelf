import React, { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { handleLogin } from '../../services/authservice';
import { getImageUrl } from '../../utils';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onLogin = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            const { success, message } = await handleLogin(email, password);
            if (success) {
                alert('Login successful!');
                navigate('/account');
            } else {
                setError(message); // Show error message if login failed
            }
        } catch (error) {
            setError(error.message); // Handle unexpected errors
        }
    };

    return (
        <section className={styles.container}>
            <img
                src={getImageUrl("login/loginLibrary.png")}
                alt="Little Library Image"
                className={styles.heroImg}
            />

            <div className={styles.content}>
                <h1 className={styles.title}>Sign in to your account</h1>
                <p className={styles.description}>
                    Access your personalized book swapping experience.
                </p>

                <form onSubmit={onLogin}>
                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Email</label>
                        <input
                            type="email"
                            placeholder="email@address.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Password</label>
                        <input
                            type="password"
                            placeholder="**********"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>

                    {error && <p className={styles.error}>{error}</p>}

                    <button type="submit" className={styles.loginBtn}>Sign in</button>
                </form>

                <p className={styles.registerPrompt}>
                    New to Swap & Share Bookshelf? <Link to="/signup">Create an Account</Link>
                </p>
            </div>
        </section>
    );
};
