import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";
import styles from "./MyListings.module.css";
import CreateListingModal from "../Marketplace/CreateListingModal";
import Listing from "../Listing/Listing";

export const MyListings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    const querySnapshot = await getDocs(collection(firestore, "listings"));
    const fetchedListings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setListings(fetchedListings);
  };

  const handleCreateListing = () => {
    setIsModalOpen(false);
    fetchListings(); // Refresh listings when a new one is created
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>MY LISTINGS</h1>
        <div className={styles.buttonContainer}>
          <button className={styles.exploreBtn} onClick={() => setIsModalOpen(true)}>
            Create Listing
          </button>
        </div>
      </div>

      <div className={styles.listingWrapper}>
        <div className={styles.listingGrid}>
          {listings.map((listing) => (
            <Listing key={listing.id} listing={listing} />
          ))}
        </div>
      </div>

      <CreateListingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreate={handleCreateListing} 
      />
    </section>
  );
};

export default MyListings;
