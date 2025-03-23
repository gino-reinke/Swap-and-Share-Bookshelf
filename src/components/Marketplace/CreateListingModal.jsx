import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { getAuth } from "firebase/auth";
import styles from "./CreateListingModal.module.css";

export const CreateListingModal = ({ isOpen, onClose, onCreate }) => {
  if (!isOpen) return null;

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
    isbn: "",
    condition: "",
    image: "",
    state: "",
    city: "",
  });

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: "United States" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data && data.data.states) {
          setStates(data.data.states);
        } else {
          console.error("Invalid API response:", data);
        }
      })
      .catch((err) => console.error("Error fetching states:", err));
  }, []);

  useEffect(() => {
    if (formData.state) {
      fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: "United States", state: formData.state }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            setCities(data.data);
          } else {
            console.error("Invalid API response:", data);
          }
        })
        .catch((err) => console.error("Error fetching cities:", err));
    } else {
      setCities([]);
    }
  }, [formData.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      // Check if file is larger than 1MB
      if (file.size > 1048487) {
        alert("File size too large. Resizing...");
      }
  
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          // Create a canvas to resize image
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
  
          // Set max width and height (adjust as needed)
          const maxWidth = 800;
          const maxHeight = 800;
          let width = img.width;
          let height = img.height;
  
          // Scale the image while maintaining aspect ratio
          if (width > maxWidth || height > maxHeight) {
            const aspectRatio = width / height;
            if (width > height) {
              width = maxWidth;
              height = maxWidth / aspectRatio;
            } else {
              height = maxHeight;
              width = maxHeight * aspectRatio;
            }
          }
  
          // Resize image
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
  
          // Convert to Base64 with reduced quality
          const resizedImage = canvas.toDataURL("image/jpeg", 0.7); // 0.7 reduces size without losing quality
  
          // Check final size
          if (resizedImage.length > 1048487) {
            alert("Resized image is still too large. Please upload a smaller image.");
          } else {
            setFormData({ ...formData, image: resizedImage });
          }
        };
      };
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (!user) {
      console.error("User not authenticated.");
      return;
    }
  
    try {
      await addDoc(collection(firestore, "listings"), {
        ...formData,
        userId: user.uid,
        username: user.displayName || "Anonymous", // Add displayName here
        timestamp: new Date(),
      });
  
      onCreate();
      setFormData({
        title: "",
        author: "",
        description: "",
        genre: "",
        isbn: "",
        condition: "",
        image: "",
        state: "",
        city: "",
      });
  
      onClose();
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };
  

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
      <button className={styles.closeBtn} onClick={onClose}>
          &times;
        </button>        <h2 className={styles.modalTitle}>Create Listing</h2>
        <form className={styles.createListingForm} onSubmit={handleSubmit}>
          <div className={styles.formAndImage}>
            
            {/* First Column: Image Preview */}
            <div className={styles.imagePreview}>
              {formData.image ? (
                <img className={styles.bookImg} src={formData.image} alt="Book Preview" />
              ) : (
                <div className={styles.bookImgPlaceholder}>No Image</div>
              )}
            </div>

            {/* Second Column: Book Details */}
            <div className={styles.formContent}>
              <label className={styles.createListingHeading}>Book Details</label>
              <input type="text" name="title" placeholder="Book Title" value={formData.title} onChange={handleChange} required />
              <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} required />
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} rows="5" className={styles.textarea} required></textarea>

              <select name="genre" value={formData.genre} onChange={handleChange} required>
                <option value="">Select Genre</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-fiction">Non-fiction</option>
                <option value="Mystery">Mystery</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Other">Other</option>
              </select>

              <input type="text" name="isbn" placeholder="ISBN Number" value={formData.isbn} onChange={handleChange} required />
            </div>

            {/* Third Column: Condition, Location, and Image Upload */}
            <div className={styles.extraColumn}>
              <label className={styles.createListingHeading}>‎ </label>
              <select name="condition" value={formData.condition} onChange={handleChange} required>
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>

              <select name="state" value={formData.state} onChange={handleChange} required>
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.name} value={state.name}>{state.name}</option>
                ))}
              </select>

              <select name="city" value={formData.city} onChange={handleChange} required disabled={!formData.state}>
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
                Upload image:
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>Create Listing</button>
        </form>
      </div>
    </div>
  );
};

export default CreateListingModal;
