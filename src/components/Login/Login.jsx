import React, { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { getImageUrl } from '../../utils';
import { Eye, EyeOff } from 'lucide-react';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            console.log('User logged in:', user.displayName);
            alert('Login successful!');
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Incorrect email or password, try again...');
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

            <div className={styles.content}>
                <h1 className={styles.title}>Sign in to your account</h1>
                <p className={styles.description}>
                    Access your personalized book swapping experience.
                </p>

                <form onSubmit={handleLogin}>
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

                    <button type="submit" className={styles.loginBtn}>Sign in</button>
                </form>

                <p className={styles.registerPrompt}>
                    New to Swap & Share Bookshelf? <Link to="/signup">Create an Account</Link>
                </p>
            </div>
        </section>
    );
};