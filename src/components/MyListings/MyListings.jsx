import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firestore } from "../../firebase";
import styles from "./MyListings.module.css";
import CreateListingModal from "../Marketplace/CreateListingModal";
import Listing from "../Listing/Listing";

export const MyListings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listings, setListings] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  /** Watch auth state so always have the right user id */
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUserId(user ? user.uid : null);
    });
    return unsubscribe; // clean up listener on unmount
  }, []);

  /** Fetch the user’s own listings whenever user or modal changes */
  useEffect(() => {
    if (currentUserId) fetchListings(currentUserId);
  }, [currentUserId]);

  const fetchListings = async (uid) => {
    const snapshot = await getDocs(collection(firestore, "listings"));
    const userListings = snapshot.docs          // all docs…
      .map((doc) => ({ id: doc.id, ...doc.data() })) // …to objects
      .filter((listing) => listing.userId === uid); // keep the owner’s

    setListings(userListings);
  };

  const handleCreateListing = () => {
    setIsModalOpen(false);
    if (currentUserId) fetchListings(currentUserId); // refresh list
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>MY LISTINGS</h1>
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

export default MyListings;
