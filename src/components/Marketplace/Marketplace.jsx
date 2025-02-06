import React, { useState } from "react";
import styles from "./Marketplace.module.css";

const CreateListingForm = ({ onCreate }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    condition: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
    setFormData({ title: "", author: "", genre: "", isbn: "", condition: "", image: "" });
  };

  return (
    <div className={styles.createListingForm}>
      <h1 className={styles.title}>Create Listing</h1>
      <div className={styles.formAndImage}>
        <div className={styles.imagePreview}>
          {formData.image && <img src={formData.image} alt="Preview" className={styles.bookImg} />}
        </div>
        <div className={styles.formContent}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="genre"
              placeholder="Genre"
              value={formData.genre}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="isbn"
              placeholder="ISBN Number"
              value={formData.isbn}
              onChange={handleChange}
              required
            />
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
            >
              <option value="">Select Condition</option>
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <button type="submit" className={styles.createListingBtn}>
              Create Listing
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

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
          <h2>Available Listings</h2>
          <div className={styles.bookGrid}>
            {listings.map((book, index) => (
              <div key={index} className={styles.bookCard}>
                {book.image && <img src={book.image} alt={book.title} className={styles.bookImg} />}
                <div className={styles.bookInfo}>
                  <h3 className={styles.bookTitle}>{book.title}</h3>
                  <p className={styles.bookAuthor}>by {book.author}</p>
                  <p className={styles.bookGenre}>{book.genre}</p>
                  <p className={styles.bookISBN}>ISBN: {book.isbn}</p>
                  <p className={styles.bookCondition}>Condition: {book.condition}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

