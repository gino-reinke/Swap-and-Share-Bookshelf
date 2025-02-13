import React, { useState } from "react";
import styles from "./Marketplace.module.css";
import BookCard from "../BookCard/BookCard";
import CreateListingForm from "../CreateListingForm/CreateListingForm";

export const Marketplace = () => {
  const [isCreateListingPage, setIsCreateListingPage] = useState(false);
  const [listings, setListings] = useState([]);

  const handleCreateListing = (newListing) => {
    setListings([...listings, newListing]);
    setIsCreateListingPage(false); 
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>MARKETPLACE</h1>
        <div className={styles.buttonContainer}>
          <button
            className={styles.exploreBtn}
            onClick={() => setIsCreateListingPage(true)} 
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

      {isCreateListingPage ? (
        <CreateListingForm onCreate={handleCreateListing} />
      ) : (
        <div className={styles.marketplaceContent}>
          <div className={styles.bookGrid}>
            {listings.map((book, index) => (
              <BookCard key={index} book={book} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};