import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firestore } from "../../firebase";
import styles from "./Marketplace.module.css";
import CreateListingModal from "./CreateListingModal";
import Listing from "../Listing/Listing";

export const Marketplace = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listings, setListings] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  /** Keep track of signed-in user */
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUserId(user ? user.uid : null);
    });
    return unsubscribe;
  }, []);

  /** Fetch listings not created by the signed-in user */
  useEffect(() => {
    if (currentUserId !== null) fetchListings(currentUserId);
  }, [currentUserId]);

  const fetchListings = async (uid) => {
    const snapshot = await getDocs(collection(firestore, "listings"));
    const marketplaceListings = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((listing) => listing.userId !== uid); // exclude owner’s

    setListings(marketplaceListings);
  };

  const handleCreateListing = () => {
    setIsModalOpen(false);
    if (currentUserId !== null) fetchListings(currentUserId); // refresh
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>MARKETPLACE</h1>
        <div className={styles.buttonContainer}>
          <button
            className={styles.exploreBtn}
            onClick={() => setIsModalOpen(true)}
          >
            Create Listing
          </button>
          <button
            className={styles.filterBtn}
            onClick={() => alert("Pressed!")}
          >
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
