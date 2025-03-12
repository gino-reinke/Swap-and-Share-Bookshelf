import React, { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { handleLogin } from '../../services/authservice';
import { getImageUrl } from '../../utils';
import { Eye, EyeOff } from 'lucide-react';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <section className={styles.container}>
            <img
                src={getImageUrl("login/loginLibrary.png")}
                alt="Little Library Image"
                className={styles.heroImg}
            />


  return (
    <section className={styles.container}>
      <img 
        src={getImageUrl("login/loginLibrary.png")} 
        alt="Little Library Image" 
        className={styles.heroImg}
      />
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
                        <div className={styles.passwordContainer}>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="**********"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                className={styles.input}
                                required
                            />
                            <button
                                type="button"
                                className={styles.passwordToggle}
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
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
