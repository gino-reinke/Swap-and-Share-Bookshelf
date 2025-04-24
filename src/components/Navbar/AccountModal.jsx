import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AccountModal.module.css";
import { AuthContext } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const AccountModal = ({ isOpen, onClose }) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSignOut = async () => {
    try {
      navigate("/"); // Redirect to home
      await signOut(auth);
      alert("Signed out");
      onClose(); // Close modal after signing out
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Sign-out failed. Try again.");
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>{currentUser ? "Account Options" : "Welcome!"}</h2>
        {currentUser ? (
          <>
            <button onClick={() => { navigate("/profile"); onClose(); }}>Account</button>
            <button onClick={() => { navigate("/mylistings"); onClose(); }}>My Listings</button>
            <button onClick={handleSignOut}>Sign Out</button>
          </>
        ) : (
          <>
            <button onClick={() => { navigate("/signup"); onClose(); }}>Sign Up</button>
            <button onClick={() => { navigate("/signin"); onClose(); }}>Login</button>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountModal;
