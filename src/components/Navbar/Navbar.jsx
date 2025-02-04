import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import styles from './Navbar.module.css';
import { getImageUrl } from '../../utils';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <nav className={styles.navbar}>
      <a className={styles.title} href="/">Swap & Share Bookshelf</a>
      <div className={styles.menu}>
        <img 
          className={styles.menuBtn} 
          src={
            menuOpen 
              ? getImageUrl("nav/menu.png") // can change to close icon maybe
              : getImageUrl("nav/menu.png")
          } 
          alt="menu-button" 
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <ul className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
        onClick={() => setMenuOpen(false)}>
            <li><a href="#Marketplace">Marketplace</a></li>
            <li><a href="#tradingtips">Trading Tips</a></li>
            <li><a href="#about">About</a></li>
            <li>
              <input 
                type="text" 
                placeholder="Search..." 
                className={styles.searchBar} 
              />
            </li>
            <li className={styles.icons}>
              <img src={getImageUrl("nav/heart.png")} alt="heart" className={styles.icon} />
              <img src={getImageUrl("nav/inbox.png")} alt="inbox" className={styles.icon} />
              <img 
                src={getImageUrl("nav/account.png")} 
                alt="account" 
                className={styles.icon} 
                onClick={() => navigate('/signin')} // Navigate to Login page
                style={{ cursor: "pointer" }} // Make it clear it's clickable
              />
            </li>
        </ul>
      </div>
    </nav>
  );
};
