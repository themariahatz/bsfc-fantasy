// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

export { db };