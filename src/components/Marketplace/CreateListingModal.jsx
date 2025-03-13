import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import { firestore } from "../../firebase"; // Import Firestore instance
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import styles from "./CreateListingModal.module.css";

export const CreateListingModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
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

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const auth = getAuth(); // Get Firebase authentication instance
    const user = auth.currentUser; // Get current user
  
    if (!user) {
      console.error("User not authenticated.");
      return;
    }
  
    try {
      // Add listing with userId
      await addDoc(collection(firestore, "listings"), {
        ...formData,
        userId: user.uid, // Store the authenticated user's ID
        timestamp: new Date(), // Optional: Save timestamp
      });
  
      setFormData({
        title: "",
        author: "",
        description: "",
        genre: "",
        isbn: "",
        condition: "",
        image: "",
      });
  
      onClose();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
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
            <div className={styles.imagePreview}>
              {formData.image ? (
                <img className={styles.bookImg} src={formData.image} alt="Book Preview" />
              ) : (
                <div className={styles.bookImgPlaceholder}>No Image</div>
              )}
            </div>

            <div className={styles.formContent}>
              <label className={styles.createListingHeading}>Book Details</label>

              <input type="text" name="title" placeholder="Book Title" value={formData.title} onChange={handleChange} required />
              <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} required />
              <textarea 
                name="description" 
                placeholder="Description" 
                value={formData.description} 
                onChange={handleChange} 
                rows="5"  // Adjust the rows for better height
                className={styles.textarea} // Add a CSS class for styling
                required
              ></textarea>
              <select name="genre" value={formData.genre} onChange={handleChange} required>
                <option value="">Select Genre</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-fiction">Non-fiction</option>
                <option value="Mystery">Mystery</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Other">Other</option>
              </select>
              <input type="text" name="isbn" placeholder="ISBN Number" value={formData.isbn} onChange={handleChange} required />
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
