import React, { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { getImageUrl } from '../../utils';
import { CometChatUIKit } from "@cometchat/chat-uikit-react";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 1. Log in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      console.log("Firebase Login Success:", firebaseUser.uid, firebaseUser.displayName);

      // 2. Check if the user is already logged in to CometChat
      const ccUser = await CometChatUIKit.getLoggedinUser();

      if (!ccUser) {
        // 3. If not logged in, log in with the string UID (firebaseUser.uid).
        await CometChatUIKit.login(firebaseUser.uid);
        console.log("CometChat Login Success:", firebaseUser.uid);
      } else {
        console.log("CometChat: user already logged in:", ccUser.uid);
      }

      alert("Login successful!");
      // 4. Navigate to your chat page or wherever
      navigate('/messaging');

    } catch (error) {
      console.error('Error logging in:', error);
      alert('Incorrect email or password, try again...');
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
            <input
              type="password"
              placeholder="**********"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={styles.input}
              required
            />
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
