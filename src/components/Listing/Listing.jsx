import React from "react";
import styles from "./Listing.module.css";
import { getImageUrl } from '../../utils';

const Listing = () => {
  return (
    <section className={styles.container}>
      <div className={styles.column}>
        <div className={styles.bookCover}>
          <div className={styles.bookCoverWrapper}>
            <img
              src= {getImageUrl("listing/heart.png")}
              className={styles.favoriteIcon}
              alt="Favorite Cover"
            />
          </div>
        </div>
        <span className={styles.bookTitle}>{"Book 01"}</span>
        <span className={styles.bookDescription}>
          {
            "Book Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod"
          }
        </span>
        <div className={styles.detailsRow}>
          <button className={styles.detailsButton} onClick={() => alert("Pressed!")}>
            <span className={styles.buttonText}>{"More details"}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Listing;
