

import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
 

// console.log( process.env );

// Your web app's Firebase configuration 
//dev/prod
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
};

//test
// const firebaseConfigTesting = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID
// };

// if( process.env.NODE_ENV === 'test' ){

//     const app = initializeApp(firebaseConfigTesting);
    
//   } else {
//     //dev/prod

//     const app = initializeApp(firebaseConfig);
    
//   }
  
  
  const app = initializeApp(firebaseConfig);

// Initialize Firebase
const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export {
   db,
   googleAuthProvider
}