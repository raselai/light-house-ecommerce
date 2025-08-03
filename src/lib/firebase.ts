// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNCjEwDgiBJfFtcek-MMQqEGs3nXKUhgE",
  authDomain: "nazmul-hoque.firebaseapp.com",
  projectId: "nazmul-hoque",
  storageBucket: "nazmul-hoque.firebasestorage.app",
  messagingSenderId: "96731948541",
  appId: "1:96731948541:web:419962ddb96dcf97c62594",
  measurementId: "G-PZEHDXFX8R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage
export const storage = getStorage(app);

export default app; 