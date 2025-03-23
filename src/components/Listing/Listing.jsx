// src/components/Listing/Listing.jsx
import React, { useState } from "react";
import styles from "./Listing.module.css";
import { getImageUrl } from '../../utils';
import DetailedListing from "./DetailedListing"; // <-- new import

const Listing = ({ listing }) => {
  const { title, description, state, city, image } = listing;
  const [showDetailedModal, setShowDetailedModal] = useState(false);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <>
      <section className={styles.container}>
        <div className={styles.column}>
          <div className={styles.bookCover}>
            {image && (
              <img src={image} className={styles.bookImage} alt={title} />
            )}
            <img src={getImageUrl("listing/heart.png")} className={styles.favoriteIcon} alt="Favorite Icon" />
          </div>
          <span className={styles.bookTitle}>{title}</span>
          <span className={styles.bookDescription}>
            {truncateText(description, 132)}
          </span>
          <span className={styles.bookLocation}>{city}, {state}</span>
          <div className={styles.detailsRow}>
            <button className={styles.detailsButton} onClick={() => setShowDetailedModal(true)}>
              <span className={styles.buttonText}>More details</span>
            </button>
          </div>
        </div>
      </section>

      {showDetailedModal && (
        <DetailedListing listing={listing} onClose={() => setShowDetailedModal(false)} />
      )}
    </>
  );
};

export default Listing;
