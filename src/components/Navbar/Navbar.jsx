import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';  // <-- import Link
import styles from './Navbar.module.css';
import { getImageUrl } from '../../utils';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      {/* Replace anchor with Link for home */}
      <Link to="/" className={styles.title}>
        Swap & Share Bookshelf
      </Link>

      <div className={styles.menu}>
        <img
          className={styles.menuBtn}
          src={
            menuOpen
              ? getImageUrl("nav/menu.png") // can change to close icon
              : getImageUrl("nav/menu.png")
          }
          alt="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        />

        {/* Fix template string syntax for className */}
        <ul
          className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
          onClick={() => setMenuOpen(false)}
        >
          {/* Replace anchor tags with Link */}
          <li>
            <Link to="/marketplace">Marketplace</Link>
          </li>
          <li>
            <Link to="/tradingtips">Trading Tips</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <input
              type="text"
              placeholder="Search..."
              className={styles.searchBar}
            />
          </li>
          <li className={styles.icons}>
            <img
              src={getImageUrl("nav/heart.png")}
              alt="heart"
              className={styles.icon}
            />
            <img
              src={getImageUrl("nav/inbox.png")}
              alt="inbox"
              className={styles.icon}
            />
            <img
              src={getImageUrl("nav/account.png")}
              alt="account"
              className={styles.icon}
              onClick={() => navigate('/signin')} // Or <Link to="/signin"><img .../></Link>
              style={{ cursor: "pointer" }}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
};
