import React, { useEffect, useState } from 'react';
import styles from './LocalListings.module.css';
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";
import { getImageUrl } from '../../utils';
import Listing from '../Listing/Listing';

export const LocalListings = () => {
  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const listingsPerPage = 3;

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    const querySnapshot = await getDocs(collection(firestore, "listings"));
    const fetchedListings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setListings(fetchedListings);
  };

  const totalPages = Math.ceil(listings.length / listingsPerPage);
  const startIndex = currentPage * listingsPerPage;
  const paginatedListings = listings.slice(startIndex, startIndex + listingsPerPage);

  const handlePrev = () => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  };

  return (
    <section className={styles.listingsSection}>
      <div className={styles.listingsWrapper}>
        <div className={styles.headerRow}>
          <div className={styles.titleContainer}>
            <span className={styles.sectionLabel}>marketplace</span>
            <span className={styles.sectionTitle}>Books Available in Your Area</span>
          </div>
          <div className={styles.navigationButtons}>
            <button className={styles.navButton} onClick={handlePrev} disabled={currentPage === 0}>
              <img
                src={getImageUrl("locallistings/arrow-left.svg")}
                className={styles.arrowIcon}
                alt="Navigate left"
              />
            </button>
            <button className={styles.navButtonAlt} onClick={handleNext} disabled={currentPage === totalPages - 1}>
              <img
                src={getImageUrl("locallistings/arrow-right.svg")}
                className={styles.arrowIcon}
                alt="Navigate right"
              />
            </button>
          </div>
        </div>
  
        <div className={styles.listingGrid}>
          {paginatedListings.map(listing => (
            <Listing key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );  
};
