// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmo0ZO5i1UYT5Sfu3vdrA7jhdPiYp-Srk",
  authDomain: "instagram-clone-react-6eee0.firebaseapp.com",
  projectId: "instagram-clone-react-6eee0",
  storageBucket: "instagram-clone-react-6eee0.appspot.com",
  messagingSenderId: "45902936479",
  appId: "1:45902936479:web:2e93c7b21b265fe82125aa",
  measurementId: "G-S5ZG9NP1XL"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get services using the modular syntax
const db = getFirestore(firebaseApp);
const auth = getAuth();
const storage = getStorage(firebaseApp);

export { db, auth, storage };;

// Initialize the auth instance

