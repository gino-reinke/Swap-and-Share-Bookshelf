import React, { useState } from 'react';
import styles from './Signup.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import { getImageUrl } from '../../utils';

export const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update user profile with the username
            await updateProfile(user, {
                displayName: username,
            });

            console.log('User signed up:', user);
            alert('Account successfully created!');
        } catch (error) {
            console.error('Error signing up:', error);
            alert('Error signing up, try again...');
        }
    };

    return (
        <section className={styles.container}>
            {/* Move the image div to the left */}
            <img 
                src={getImageUrl("signup/signupLibrary.png")} 
                alt="Little Library Image" 
                className={styles.heroImg}
            />

            <div className={styles.content}>
                <h1 className={styles.title}>Create an account</h1>
                <p className={styles.description}>
                    Access your personalized book swapping experience.
                </p>

                <form onSubmit={handleSignup}>
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
                        <label className={styles.label}>Username</label>
                        <input
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
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

                    <button type="submit" className={styles.loginBtn}>Create Account</button>
                </form>

                <p className={styles.registerPrompt}>
                    Already have an account? <Link to="/signin">Sign in</Link>
                </p>
            </div>
        </section>
    );
};
