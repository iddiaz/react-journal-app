import { db } from "../firebase/firebase-config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import {types} from '../types/types';
import { loadNotes } from "../helpers/loadNotes";


export const startNewNote = ()=>{
  
   //redux-thunk middle. El segundo argumento obtiene toda info directamente del store   
   return async( dispatch, getState ) =>{

      const state = getState();
      console.log(state);

      const {uid} = getState().auth;
      console.log(uid);

      const newNote = {
         title: '',
         body: '',
         date: new Date().getTime()
      }

      //old
      // const doc = db.collection(`${uid}/journal/notes`).add(newNote);

      // new firebase update
      const docRef = await addDoc(collection(db,  `${ uid }`, "journal/notes"), newNote );
      console.log("Document written with ID: ", docRef.id);

      dispatch( activeNote( docRef.id, newNote ) );


   }
}

export const activeNote = ( id, note ) => ({
  
   type: types.notesActive,
   payload: {
      id,
      ...note
   }

})

export const startLoadingNotes = ( uid ) => {

   return async( dispatch ) => {
     
      const notes = await loadNotes( uid );
      dispatch( setNotes( notes ) );

   }

}


export const setNotes = ( notes ) => ({
  
   type: types.notesLoad,
   payload: notes

})



