// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC7qt7GQNSrXnHvUKlVOojeHwvijgsGZ58",
  authDomain: "bsfc-fantasy.firebaseapp.com",
  projectId: "bsfc-fantasy",
  storageBucket: "bsfc-fantasy.firebasestorage.app",
  messagingSenderId: "722933436338",
  appId: "1:722933436338:web:6598928e0f4b1c093e5eab",
  measurementId: "G-2C89K9045S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
