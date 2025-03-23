import React from "react";
import styles from "./About.module.css";
import { getImageUrl } from "../../utils";

export const About = () => {
  return (
    <section className={styles.container}>
        <br /><br />
      <h1>About Swap & Share Bookshelf</h1>
      <p>
        Swap & Share Bookshelf is a community-driven platform that allows book lovers to 
        exchange books online easily and conveniently. Whether you're looking to discover new 
        stories or share your favorite reads, our platform connects readers from all around 
        to swap books for free.
      </p>
      <p>
        Simply list the books you want to swap, browse available books, and connect with 
        fellow readers to arrange an exchange. Join us in promoting sustainable reading 
        and building a global book-sharing community!
      </p>
      
      {/*Image Tag */}
      {/* <img 
        src={getImageUrl("login/loginLibrary.png")} 
        alt="Little Library Image" 
        className={styles.heroImg}
      /> */}
    </section>
  );
};