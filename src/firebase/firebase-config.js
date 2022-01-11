

import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
 



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0crEaaJBddscZHDMH86ku4peagAmX__k",
  authDomain: "react-app-journal-36eb9.firebaseapp.com",
  projectId: "react-app-journal-36eb9",
  storageBucket: "react-app-journal-36eb9.appspot.com",
  messagingSenderId: "109352522832",
  appId: "1:109352522832:web:a4fd43f2f53a5d04eead55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export {
   db,
   googleAuthProvider
}