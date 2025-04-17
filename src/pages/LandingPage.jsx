import React from 'react';
import { Landing } from '../components/Landing/Landing';
import { Navbar } from '../components/Navbar/Navbar';
import styles from '../App.module.css';

function LandingPage() {
  return (
    <div className={styles.App}>
      <Navbar />
      <Landing />
    </div>
  );
}

export default LandingPage;