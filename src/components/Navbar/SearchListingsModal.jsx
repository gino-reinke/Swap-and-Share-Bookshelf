import React from "react";
import styles from "./SearchListingsModal.module.css";

const SearchListingsModal = ({ isOpen, onClose, results, anchorRef }) => {
  if (!isOpen) return null;

  const rect = anchorRef?.current?.getBoundingClientRect();
  const top = rect ? rect.bottom + window.scrollY : 0;
  const left = rect ? rect.left + window.scrollX : 0;
  const width = rect ? rect.width : 200;

  return (
    <div
      className={styles.dropdown}
      style={{ top: top + 5, left, width }}
      onMouseLeave={onClose}
    >
      {results.length === 0 ? (
        <div className={styles.empty}>No results found</div>
      ) : (
        results.map((item, index) => (
          <div key={index} className={styles.resultItem}>
            <img src={item.image} alt="book" className={styles.bookImg} />
            <div className={styles.info}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.author}>{item.author}</div>
              <div className={styles.condition}>{item.condition}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchListingsModal;
