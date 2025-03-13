import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";
import styles from "./Marketplace.module.css";
import CreateListingModal from "./CreateListingModal";
import Listing from "../Listing/Listing";

export const Marketplace = () => {
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
        <h1 className={styles.title}>MARKETPLACE</h1>
        <div className={styles.buttonContainer}>
          <button className={styles.exploreBtn} onClick={() => setIsModalOpen(true)}>
            Create Listing
          </button>
          <button className={styles.filterBtn} onClick={() => alert("Pressed!")}>
            All Filters
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

export default Marketplace;
