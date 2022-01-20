

import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
 



// Your web app's Firebase configuration
//dev/prod
const firebaseConfig = {
  apiKey: "AIzaSyB0crEaaJBddscZHDMH86ku4peagAmX__k",
  authDomain: "react-app-journal-36eb9.firebaseapp.com",
  projectId: "react-app-journal-36eb9",
  storageBucket: "react-app-journal-36eb9.appspot.com",
  messagingSenderId: "109352522832",
  appId: "1:109352522832:web:a4fd43f2f53a5d04eead55"
};

//test
const firebaseConfigTesting = {
  apiKey: "AIzaSyCWrZf6jw-SlEKbZd-CSBzFQVrds2dwEcQ",
  authDomain: "test-db-react-5e509.firebaseapp.com",
  projectId: "test-db-react-5e509",
  storageBucket: "test-db-react-5e509.appspot.com",
  messagingSenderId: "735526459305",
  appId: "1:735526459305:web:661b917d34f3ee56ba16b8"
};

if( process.env.NODE_ENV === 'test' ){

    const app = initializeApp(firebaseConfigTesting);
    
  } else {
    //dev/prod

    const app = initializeApp(firebaseConfig);

}

console.log(process.env);

// Initialize Firebase
const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export {
   db,
   googleAuthProvider
}