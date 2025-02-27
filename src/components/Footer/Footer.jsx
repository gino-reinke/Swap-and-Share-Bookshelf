import React from 'react';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>&copy; 2025 Swap and Share Bookshelf. All rights reserved.</p>
        <nav>
          <ul className={styles.navList}>
            <li><a href="/marketplace">Marketplace</a></li>
            <li><a href="/tradingtips">Trading Tips</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
