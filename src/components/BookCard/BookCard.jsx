import React from "react";
import styles from "./BookCard.module.css";

const BookCard = ({ book }) => {
  return (
    <div className={styles.bookCard}>
      {book.image && <img src={book.image} alt={book.title} className={styles.bookImg} />}
      <div className={styles.bookInfo}>
        <h3 className={styles.bookTitle}>{book.title}</h3>
        <p className={styles.bookAuthor}>by {book.author}</p>
        <p className={styles.bookGenre}>{book.genre}</p>
        <p className={styles.bookISBN}>ISBN: {book.isbn}</p>
        <p className={styles.bookCondition}>Condition: {book.condition}</p>
      </div>
    </div>
  );
};

export default BookCard;