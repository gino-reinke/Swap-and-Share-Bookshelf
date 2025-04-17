import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

export const Landing = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    <span className={styles.whiteText}>Pass A Book,</span>
                    <br />
                    <span className={styles.redText}>Gain A Story</span>
                </h1>
                <div className={styles.buttonContainer}>
                    <Link to="/signup" className={`${styles.button} ${styles.signup}`}>
                        Sign Up
                    </Link>
                    <Link to="/signin" className={`${styles.button} ${styles.login}`}>
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};