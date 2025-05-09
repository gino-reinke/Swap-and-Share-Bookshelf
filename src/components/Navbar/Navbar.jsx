import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils";
import AccountModal from "./AccountModal";
import DetailedListing from "../Listing/DetailedListing";
import { AuthContext } from "../../context/AuthContext";
import { firestore } from "../../firebase";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const searchWrapperRef = useRef(null);
  const inputRef = useRef(null);
  const { currentUser } = useContext(AuthContext);

  // Use the useLocation hook to get the current path
  const location = useLocation();
  console.log("Current Path:", location.pathname);


  // Debounced search
  useEffect(() => {
    const delay = setTimeout(() => {
      performSearch(searchText);
    }, 300);
    return () => clearTimeout(delay);
  }, [searchText]);

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const performSearch = async (text) => {
    if (!text.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const snapshot = await getDocs(collection(firestore, "listings"));
    const results = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      const q = text.toLowerCase();
      if (
        data.title?.toLowerCase().includes(q) ||
        data.author?.toLowerCase().includes(q) ||
        data.isbn?.toLowerCase().includes(q)
      ) {
        results.push(data);
      }
    });

    setSearchResults(results);
    setShowDropdown(true);
  };

  const handleResultClick = (listing) => {
    setSelectedListing(listing);
    setShowDropdown(false);
  };

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
              <Link
                to="/marketplace"
                className={location.pathname === "/marketplace" ? styles.activeLink : ""}
              >
                Marketplace
              </Link>
            </li>
            <li>
              <Link
                to="/tradingtips"
                className={location.pathname === "/tradingtips" ? styles.activeLink : ""}
              >
                Trading Tips
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={location.pathname === "/about" ? styles.activeLink : ""}
              >
                About
              </Link>
            </li>

            {/* 🔍 Search input and dropdown */}
            <li style={{ position: "relative" }} ref={searchWrapperRef}>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search..."
                className={styles.searchBar}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onFocus={() => {
                  if (searchText.trim()) {
                    setShowDropdown(true);
                  }
                }}
              />
              {showDropdown && (
                <div className={styles.searchDropdown}>
                  {searchResults.length > 0 ? (
                    searchResults.map((item, index) => (
                      <div
                        key={index}
                        className={styles.searchResult}
                        onClick={() => handleResultClick(item)} // click triggers modal
                      >
                        <img src={item.image} alt="Book" className={styles.resultImage} />
                        <div>
                          <div className={styles.resultTitle}>{item.title}</div>
                          <div className={styles.resultAuthor}>{item.author}</div>
                          <div className={styles.resultCondition}>{item.condition}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.noResult}>No results found</div>
                  )}
                </div>
              )}
            </li>

            <li className={styles.icons}>
            <img
              src={getImageUrl("nav/heart.svg")}
              alt="heart"
              className={styles.icon}
              onClick={() => {
                if (currentUser) {
                  window.location.href = "/favorites";
                } else {
                  window.location.href = "/signin";
                }
              }}
            />
            <img
              src={getImageUrl("nav/inbox.svg")}
              alt="inbox"
              className={styles.icon}
              onClick={() => {
                if (currentUser) {
                  window.location.href = "/messaging";
                } else {
                  window.location.href = "/signin";
                }
              }}
            />
              <img
                src={getImageUrl("nav/account.svg")}
                alt="account"
                className={styles.icon}
                onClick={() => setModalOpen(true)}
              />
            </li>
          </ul>
        </div>
      </nav>

      {/* Account Modal */}
      <AccountModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Detailed listing modal */}
      {selectedListing && (
        <DetailedListing
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
        />
      )}
    </>
  );
};
