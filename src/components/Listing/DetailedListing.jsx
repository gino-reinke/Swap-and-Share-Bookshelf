import React, { useContext } from "react";
import styles from "./DetailedListing.module.css";
import { AuthContext } from "../../context/AuthContext";

const DetailedListing = ({ listing, onClose }) => {
  const { currentUser } = useContext(AuthContext);
  const { title, author, description, genre, isbn, condition, state, city, image, userId, username } = listing;

  const isCurrentUserOwner = currentUser && currentUser.uid === userId;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          &times;
        </button>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            {image ? (
              <img className={styles.bookImage} src={image} alt={title} />
            ) : (
              <div className={styles.imagePlaceholder}>No Image</div>
            )}
          </div>
          <div className={styles.details}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.author}><strong>Author:</strong> {author}</p>
            <p className={styles.genre}><strong>Genre:</strong> {genre}</p>
            <p className={styles.isbn}><strong>ISBN:</strong> {isbn}</p>
            <p className={styles.condition}><strong>Condition:</strong> {condition}</p>
            <p className={styles.location}><strong>Location:</strong> {city}, {state}</p>
            <p className={styles.description}><strong>Description:</strong> {description}</p>
            <p className={styles.listedBy}><strong>Listed by:</strong> {username}</p>

            {/* Explicit check: Button only if current user is NOT the owner */}
            {!isCurrentUserOwner && currentUser && (
              <button
                className={styles.messageBtn}
                onClick={() => alert(`Message button pressed for ${username}`)}
              >
                Message User
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedListing;
