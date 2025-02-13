import React, { useState } from "react";
import styles from "./CreateListingForm.module.css";

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

export default CreateListingForm;