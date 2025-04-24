import React from "react";
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.scrollView}>
        <div className={styles.box}></div>
        <div className={styles.rowView}>
          <span className={styles.text}>
            {"EXPLORE\nMarketplace\nFavorites"}
          </span>
          <span className={styles.text2}>
            {"ABOUT US\nTrading Tips\nAbout"}
          </span>
        </div>
        <div className={styles.rowView2}>
          <span className={styles.text3}>
            {"SWAP & SHARE BOOKSHELF"}
          </span>
          <span className={styles.text4}>
            {"2025 Swap & Share BookShelf. All Rights Reserved."}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
