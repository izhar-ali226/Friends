// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAF0ELdFTfcH8btvOhuyMLqapA6deUCFkA",
  authDomain: "friends-8e31c.firebaseapp.com",
  projectId: "friends-8e31c",
  storageBucket: "friends-8e31c.appspot.com",
  messagingSenderId: "266198119696",
  appId: "1:266198119696:web:7d0602488736db6a26a195"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const stateChange = onAuthStateChanged;

export { firebaseConfig, auth, collection , addDoc, db, stateChange }