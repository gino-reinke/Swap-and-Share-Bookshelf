import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

export const Landing = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    <span className={styles.whiteText}>PASS A BOOK,</span>
                    <br />
                    <span className={styles.redText}>GAIN A STORY</span>
                </h1>
                <div className={styles.buttonContainer}>
                    <Link to="/signup" className={`${styles.button} ${styles.signup}`}>
                        SIGN UP
                    </Link>
                    <Link to="/signin" className={`${styles.button} ${styles.login}`}>
                        LOGIN
                    </Link>
                </div>
            </div>
        </div>
    );
};