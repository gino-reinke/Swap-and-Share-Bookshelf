import React, { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  documentId,
} from "firebase/firestore";
import { firestore, auth } from "../../firebase";

import styles from "./Favorites.module.css";
import CreateListingModal from "../Marketplace/CreateListingModal";
import Listing from "../Listing/Listing";

export const Favorites = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listings, setListings] = useState([]);

  /* --------------------------------------------- */
  /*  Grab the user’s favourite listing documents  */
  /* --------------------------------------------- */
  useEffect(() => {
    fetchFavoriteListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFavoriteListings = async () => {
    const user = auth.currentUser;
    if (!user) return;

    // 1. pull favourite IDs from user document
    const userRef = doc(firestore, "users", user.uid);
    const userSnap = await getDoc(userRef);
    const favIds = userSnap.data()?.favorites || [];

    if (favIds.length === 0) {
      setListings([]);
      return;
    }

    // 2. Firestore “in” clause only supports ≤10 IDs – split when needed
    const chunks = [];
    for (let i = 0; i < favIds.length; i += 10) {
      chunks.push(favIds.slice(i, i + 10));
    }

    const favListings = [];
    for (const ids of chunks) {
      const q = query(
        collection(firestore, "listings"),
        where(documentId(), "in", ids)
      );
      const snap = await getDocs(q);
      snap.forEach((d) => favListings.push({ id: d.id, ...d.data() }));
    }

    setListings(favListings);
  };

  const handleCreateListing = () => {
    setIsModalOpen(false);
    fetchFavoriteListings(); // refresh in case user instantly favorites it
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>FAVORITES</h1>

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
          {listings.length === 0 ? (
            <p>No favorites yet - start exploring!</p>
          ) : (
            listings.map((listing) => (
              <Listing key={listing.id} listing={listing} />
            ))
          )}
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

export default Favorites;
