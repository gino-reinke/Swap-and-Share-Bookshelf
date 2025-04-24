import React from "react";
import { Link } from "react-router-dom";
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.scrollView}>
        <div className={styles.box}></div>
        <div className={styles.rowView}>
          <div className={styles.text}>
            <strong>EXPLORE</strong><br />
            <Link to="/marketplace" className={styles.link}>Marketplace</Link><br />
            <Link to="/favorites" className={styles.link}>Favorites</Link>
          </div>
          <div className={styles.text2}>
            <strong>ABOUT US</strong><br />
            <Link to="/tradingtips" className={styles.link}>Trading Tips</Link><br />
            <Link to="/about" className={styles.link}>About</Link>
          </div>
        </div>
        <div className={styles.rowView2}>
          <span className={styles.text3}>
            SWAP & SHARE BOOKSHELF
          </span>
          <span className={styles.text4}>
            2025 Swap & Share BookShelf. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
