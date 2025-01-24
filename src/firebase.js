// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOSAVwkKsgm9s-BAXyKo1gbArtE4tetd0",
  authDomain: "swap-and-share-bookshelf.firebaseapp.com",
  projectId: "swap-and-share-bookshelf",
  storageBucket: "swap-and-share-bookshelf.firebasestorage.app",
  messagingSenderId: "306553409149",
  appId: "1:306553409149:web:c6c769bacddc410173ab14",
  measurementId: "G-XP6KETC9HK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
