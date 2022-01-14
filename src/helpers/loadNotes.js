import { db } from "../firebase/firebase-config"
import { collection, query, where,doc, getDoc, getDocs } from 'firebase/firestore';




export const loadNotes = async( uid ) => {

   const q = query(collection(db, `${ uid }`, "journal/notes" )); 
   const querySnapshot = await getDocs(q);
   // console.log(querySnapshot);
   const notes = [];

   querySnapshot.forEach((doc) => {    
      console.log(doc.id, " => ", doc.data());
      notes.push( {
         id: doc.id,
         ...doc.data() 
      } );
    });


    return notes;   
}


