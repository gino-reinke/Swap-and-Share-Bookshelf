import React, { useState } from 'react';
import styles from './Signup.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { getImageUrl } from '../../utils';

export const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    return (
        <section className={styles.container}>
            {/* Move the image div to the left */}
            <img 
                src={getImageUrl("signup/signupLibrary.png")} 
                alt="Little Library Image" 
                className={styles.heroImg}
            />

            {/* Place the sign-in form on the right */}
            <div className={styles.content}>
                <h1 className={styles.title}>Create an account</h1>
                <p className={styles.description}>
                    Access your personalized book swapping experience.
                </p>

                <div className={styles.inputContainer}>
                    <label className={styles.label}>Email</label>
                    <input
                        type="email"
                        placeholder="email@address.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className={styles.input}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <label className={styles.label}>Username</label>
                    <input
                        type="username"
                        placeholder="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        className={styles.input}
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
                    />
                </div>

                <button className={styles.loginBtn}>Create Account</button>

                <p className={styles.registerPrompt}>
                Already have an account? <a href="/signin">Sign in</a>
                </p>

            </div>
        </section>
    );
};
