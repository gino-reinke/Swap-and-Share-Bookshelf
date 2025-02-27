// src/components/Signup/Signup.jsx
import React, { useState } from 'react';
import styles from './Signup.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import { getImageUrl } from '../../utils';
// Import createUser from CometChat UI Kit
import { CometChatUIKit } from "@cometchat/chat-uikit-react";

export const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            // 1. Create user in Firebase
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. Update Firebase profile with the username (displayName)
            await updateProfile(user, {
                displayName: username,
            });
            
            // 3. Create the user in CometChat
            //    We'll use the firebase user's UID as the CometChat UID
            //    and the displayName for the CometChat name.
            await CometChatUIKit.createUser({
                uid: user.uid,
                name: username // or user.displayName
            });

            console.log('User signed up (Firebase) and created (CometChat):', user);
            alert('Account successfully created!');

            // Navigate to login or dashboard
            navigate('/signin');
        } catch (error) {
            console.error('Error signing up:', error);
            alert('Error signing up, try again...');
        }
    };

    return (
        <section className={styles.container}>
            <img 
                src={getImageUrl("signup/signupLibrary.png")} 
                alt="Little Library" 
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
