// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // NEW

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
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app); // NEW

// Optional: Automatically sign in the dev/admin user (only for development!)
signInWithEmailAndPassword(auth, "maria.baseballfan@gmail.com", "Paokforlife1999!")
  .then((userCredential) => {
    console.log("Logged in as:", userCredential.user.uid);
  })
  .catch((error) => {
    console.error("Login failed:", error.code, error.message);
  });

export { db, auth }; // Export both
