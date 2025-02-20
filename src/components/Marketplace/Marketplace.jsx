import React, { useState } from "react";
import styles from "./Marketplace.module.css";
import CreateListingModal from "./CreateListingModal";

export const Marketplace = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateListing = (newListing) => {
    setIsModalOpen(false); // Close modal after submission
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

      {/* Create Listing Modal */}
      <CreateListingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleCreateListing} />
    </section>
  );
};

export default Marketplace;
