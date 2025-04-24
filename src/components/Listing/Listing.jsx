import React, { useState, useEffect } from "react";
import styles from "./Listing.module.css";
import { getImageUrl } from "../../utils";
import DetailedListing from "./DetailedListing";

import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { firestore, auth } from "../../firebase";

const Listing = ({ listing }) => {
  const { id, title, description, state, city, image } = listing;

  const [showDetailedModal, setShowDetailedModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  /* -------------------------------------------------- */
  /*  Fetch whether this listing is already a favorite  */
  /* -------------------------------------------------- */
  useEffect(() => {
    const checkFavorite = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(firestore, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const favs = userSnap.data().favorites || [];
        setIsFavorite(favs.includes(id));
      }
    };

    checkFavorite();
  }, [id]);

  /* ------------------------------------------- */
  /*  Add-or-remove the listing from favorites  */
  /* ------------------------------------------- */
  const toggleFavorite = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please sign in to use favorites.");
      return;
    }

    const userRef = doc(firestore, "users", user.uid);

    try {
      if (isFavorite) {
        await updateDoc(userRef, { favorites: arrayRemove(id) });
      } else {
        await updateDoc(userRef, { favorites: arrayUnion(id) });
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error("Unable to update favorites:", err);
    }
  };

  /* -------------------------- */
  /*  Helper to shorten blurb   */
  /* -------------------------- */
  const truncateText = (text, maxLength) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;

  return (
    <>
      <section className={styles.container}>
        <div className={styles.column}>
          <div className={styles.bookCover}>
            {image && (
              <img src={image} className={styles.bookImage} alt={title} />
            )}

            <img
              src={getImageUrl(
                isFavorite ? "listing/heart-filled.png" : "listing/heart.png"
              )}
              className={styles.favoriteIcon}
              alt="Favorite toggle"
              onClick={toggleFavorite}
            />
          </div>

          <span className={styles.bookTitle}>{title}</span>
          <span className={styles.bookDescription}>
            {truncateText(description, 132)}
          </span>
          <span className={styles.bookLocation}>
            {city}, {state}
          </span>

          <div className={styles.detailsRow}>
            <button
              className={styles.detailsButton}
              onClick={() => setShowDetailedModal(true)}
            >
              <span className={styles.buttonText}>More details</span>
            </button>
          </div>
        </div>
      </section>

      {showDetailedModal && (
        <DetailedListing
          listing={listing}
          onClose={() => setShowDetailedModal(false)}
        />
      )}
    </>
  );
};

export default Listing;
