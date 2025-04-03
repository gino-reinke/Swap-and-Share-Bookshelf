import React from 'react';
import styles from './LocalListings.module.css';
import { getImageUrl } from '../../utils';

export const LocalListings = () => {
  return (
    <section className={styles.listingsSection}>
      <div className={styles.headerRow}>
        <div className={styles.titleContainer}>
          <span className={styles.sectionLabel}>marketplace</span>
          <span className={styles.sectionTitle}>Books Available in Your Area</span>
        </div>
        <div className={styles.navigationButtons}>
          <button className={styles.navButton} onClick={() => alert("Pressed!")}>
            <img
              src={getImageUrl("locallistings/arrow-left.svg")}
              className={styles.arrowIcon}
              alt="Navigate left"
            />
          </button>
          <button className={styles.navButtonAlt} onClick={() => alert("Pressed!")}>
            <img
              src={getImageUrl("locallistings/arrow-right.svg")}
              className={styles.arrowIcon}
              alt="Navigate right"
            />
          </button>
        </div>
      </div>
    </section>
  );
};
