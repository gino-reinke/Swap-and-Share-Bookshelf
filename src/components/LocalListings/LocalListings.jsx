import React, { useEffect, useState } from 'react';
import styles from './LocalListings.module.css';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { getImageUrl } from '../../utils';
import Listing from '../Listing/Listing';

export const LocalListings = () => {
  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  
  // User's selected location
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const listingsPerPage = 3;

  // Fetch all listings from Firestore
  const fetchListings = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'listings'));
      const fetchedListings = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListings(fetchedListings);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  // Fetch US states from countriesnow.space
  const fetchStates = async () => {
    try {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries/states', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country: 'United States' }),
      });
      const data = await response.json();
      if (data.data && data.data.states) {
        // data.data.states is an array of objects with a `name` field
        setStates(data.data.states.map(st => st.name));
      } else {
        console.error('Invalid response structure for states:', data);
      }
    } catch (err) {
      console.error('Error fetching states:', err);
    }
  };

  // Fetch cities based on selectedState
  const fetchCities = async (stateName) => {
    try {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          country: 'United States',
          state: stateName,
        }),
      });
      const data = await response.json();
      if (data.data) {
        setCities(data.data);
      } else {
        console.error('Invalid response structure for cities:', data);
      }
    } catch (err) {
      console.error('Error fetching cities:', err);
    }
  };

  // Handle user's State selection
  const handleStateChange = (e) => {
    const newState = e.target.value;
    setSelectedState(newState);
    setSelectedCity('');
    if (newState) {
      fetchCities(newState);
    } else {
      setCities([]);
    }
  };

  // Handle user's City selection
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  // Get user's geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Example using Nominatim
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
  
          const userCity =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            ""; // fallback if none
          const userState = data.address.state || "";
  
          // Set selectedCity, selectedState
          setSelectedCity(userCity);
          setSelectedState(userState);
  
          // Because changed state, load that state's city list
          if (userState) {
            await fetchCities(userState);
          }
        } catch (err) {
          console.error("Error during geocoding:", err);
        }
      }, (err) => console.error("Geolocation error:", err));
    }
  }, []);
  

  // Load the listings and states on component mount
  useEffect(() => {
    fetchListings();
    fetchStates();
  }, []);

  // Filter listings by matching state and city
  const filteredListings = listings.filter(
    (listing) =>
      listing.state === selectedState &&
      listing.city === selectedCity
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredListings.length / listingsPerPage);
  const startIndex = currentPage * listingsPerPage;
  const paginatedListings = filteredListings.slice(startIndex, startIndex + listingsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  return (
    <section className={styles.listingsSection}>
      <div className={styles.listingsWrapper}>
        <div className={styles.headerRow}>
          <div className={styles.titleContainer}>
            <span className={styles.sectionLabel}>marketplace</span>
            <span className={styles.sectionTitle}>Books Available in Your Area</span>
          </div>
          <div className={styles.navigationButtons}>
            <button
              className={styles.navButton}
              onClick={handlePrev}
              disabled={currentPage === 0}
            >
              <img
                src={getImageUrl('locallistings/arrow-left.svg')}
                className={styles.arrowIcon}
                alt="Navigate left"
              />
            </button>
            <button
              className={styles.navButtonAlt}
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
            >
              <img
                src={getImageUrl('locallistings/arrow-right.svg')}
                className={styles.arrowIcon}
                alt="Navigate right"
              />
            </button>
          </div>
        </div>

        {/* Location filters: State & City dropdowns */}
        <div className={styles.locationFilters}>
          <select
            className={styles.dropdown}
            value={selectedState}
            onChange={handleStateChange}
          >
            <option value="">Select State</option>
            {states.map((stateName) => (
              <option key={stateName} value={stateName}>
                {stateName}
              </option>
            ))}
          </select>

          <select
            className={styles.dropdown}
            value={selectedCity}
            onChange={handleCityChange}
            disabled={!selectedState}
          >
            <option value="">Select City</option>
            {cities.map((cityName) => (
              <option key={cityName} value={cityName}>
                {cityName}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.listingGrid}>
          {paginatedListings.map((listing) => (
            <Listing key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
};
