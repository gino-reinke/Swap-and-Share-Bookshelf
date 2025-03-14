import React from "react";
import styles from "./Listing.module.css";
import { getImageUrl } from '../../utils';

const Listing = ({ listing }) => {
  const { title, description, state, city, image } = listing;

  // Function to truncate the description
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <section className={styles.container}>
      <div className={styles.column}>
        <div className={styles.bookCover}>
          {image && (
            <img
              src={image}
              className={styles.bookImage}
              alt={title}
            />
          )}
          <img
            src={getImageUrl("listing/heart.png")}
            className={styles.favoriteIcon}
            alt="Favorite Icon"
          />
        </div>
        <span className={styles.bookTitle}>{title}</span>
        <span className={styles.bookDescription}>
          {truncateText(description, 132)}
        </span>
        <span className={styles.bookLocation}>{city}, {state}</span>
        <div className={styles.detailsRow}>
          <button className={styles.detailsButton} onClick={() => alert("Pressed!")}>
            <span className={styles.buttonText}>More details</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Listing;
