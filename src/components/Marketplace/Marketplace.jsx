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
  const [currentUserId, setCurrentUserId] = useState(undefined); // undefined → auth not resolved yet

  /** Keep track of signed-in user */
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUserId(user ? user.uid : null); // null → not signed-in
    });
    return unsubscribe;
  }, []);

  /* Fetch (or refetch) whenever auth state changes */
  useEffect(() => {
    // If currentUserId is undefined we’re still waiting; otherwise fetch
    if (currentUserId !== undefined) fetchListings(currentUserId);
  }, [currentUserId]);

  const fetchListings = async (uid) => {
    const snapshot = await getDocs(collection(firestore, "listings"));
    let allListings = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // If a user is signed in, remove their own listings.  
    // If uid is null (not signed in) we keep everything.
    if (uid) {
      allListings = allListings.filter((listing) => listing.userId !== uid);
    }

    setListings(allListings);
  };

  const handleCreateListing = () => {
    setIsModalOpen(false);
    // Refresh after a new listing is added
    if (currentUserId !== undefined) fetchListings(currentUserId);
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
