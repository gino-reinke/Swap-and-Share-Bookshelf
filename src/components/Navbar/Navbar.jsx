import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils";
import AccountModal from "./AccountModal";
import { AuthContext } from "../../context/AuthContext";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.title}>
          Swap & Share Bookshelf
        </Link>

        <div className={styles.menu}>
          <img
            className={styles.menuBtn}
            src={
              menuOpen
                ? getImageUrl("nav/menu.png")
                : getImageUrl("nav/menu.png")
            }
            alt="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
          />

          <ul
            className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
            onClick={() => setMenuOpen(false)}
          >
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
                src={getImageUrl("nav/heart.svg")}
                alt="heart"
                className={styles.icon}
              />
              <Link to="/messaging">
                <img
                  src={getImageUrl("nav/inbox.svg")}
                  alt="inbox"
                  className={styles.icon}
                />
              </Link>
              <img
                src={getImageUrl("nav/account.svg")}
                alt="account"
                className={styles.icon}
                onClick={() => setModalOpen(true)}
                style={{ cursor: "pointer" }}
              />
            </li>
          </ul>
        </div>
      </nav>

      {/* Account Modal */}
      <AccountModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
