import React, { useState } from "react";
import styles from "./CreateListingModal.module.css";

export const CreateListingModal = ({ isOpen, onClose, onCreate }) => {
  if (!isOpen) return null; // Don't render if modal is closed

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    condition: "",
    image: "",
  });

  // Handles input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handles image upload
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

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    onCreate(formData); // Pass form data to parent component
    setFormData({
      title: "",
      author: "",
      genre: "",
      isbn: "",
      condition: "",
      image: "",
    }); // Reset form
    onClose(); // Close modal
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.modalTitle}>Create Listing</h2>
        <form className={styles.createListingForm} onSubmit={handleSubmit}>
          <div className={styles.formAndImage}>
            {/* Image Preview Section */}
            <div className={styles.imagePreview}>
              {formData.image ? (
                <img className={styles.bookImg} src={formData.image} alt="Book Preview" />
              ) : (
                <div className={styles.bookImgPlaceholder}>No Image</div>
              )}
            </div>

            {/* Form Fields */}
            <div className={styles.formContent}>
              <label className={styles.createListingHeading}>Book Details</label>

              <input
                type="text"
                name="title"
                placeholder="Book Title"
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
              <select name="genre" value={formData.genre} onChange={handleChange} required>
                <option value="">Select Genre</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-fiction">Non-fiction</option>
                <option value="Mystery">Mystery</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="text"
                name="isbn"
                placeholder="ISBN Number"
                value={formData.isbn}
                onChange={handleChange}
                required
              />
              <select name="condition" value={formData.condition} onChange={handleChange} required>
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              <button type="submit">Create Listing</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListingModal;
