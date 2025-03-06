import React from "react";
import styles from "./Listing.module.css";
import { getImageUrl } from '../../utils';

const Listing = () => {
  return (
    <section className={styles.container}>
      <div className={styles.column}>
        <div className={styles.view}>
          <div className={styles.view2}>
            <img
              src= {getImageUrl("listing/heart.png")}
              className={styles.image2}
              alt="Book Cover"
            />
          </div>
        </div>
        <span className={styles.text}>{"Book 01"}</span>
        <span className={styles.text2}>
          {
            "Book Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod"
          }
        </span>
        <div className={styles.rowView}>
          <button className={styles.button} onClick={() => alert("Pressed!")}>
            <span className={styles.text3}>{"More details"}</span>
          </button>

        </div>
        <div className={styles.view3}>
          <img
            src= {getImageUrl("listing/heart.png")}
            className={styles.image2}
            alt="Additional Image"
          />
          </div>
      </div>
    </section>
  );
};

export default Listing;