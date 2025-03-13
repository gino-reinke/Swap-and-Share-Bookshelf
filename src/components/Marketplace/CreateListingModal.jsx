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
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
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
        timestamp: new Date(),
      });

      onCreate(); // Notify parent component
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
