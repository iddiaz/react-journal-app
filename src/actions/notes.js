import  Swal  from 'sweetalert2';
import { db } from "../firebase/firebase-config";
import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import {types} from '../types/types';
import { loadNotes } from "../helpers/loadNotes";
import { fileUpload } from '../helpers/fileUpload';



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


export const startSaveNote = ( note ) => {
  
   return async( dispatch, getState ) => {
     
      const {uid} = getState().auth;

      if( !note.url ){
         delete note.url;
      }
      
      const noteToFirestore = {...note };
      delete noteToFirestore.id;

      const noteRef = doc(db, `${uid}/journal/notes/${note.id}`)
      await updateDoc(noteRef,noteToFirestore);
      
      // dispatch( startLoadingNotes( uid ) );
      // dispatch( refreshNote( note.id, note ) );
      dispatch( refreshNote( note.id, noteToFirestore ) );
      
      Swal.fire('Saved', note.title, 'success' );
  

   }

}


export const refreshNote = ( id, note ) => ({
   type: types.notesUpdated,
   payload: {
      id,
      // note, || o recupero el id individual en cada objeto para el key del map.
      note:{
         id,
         ...note
      }
   }
})

export const startUploading = (file) => {
   //accion asincrona, usa redux-thunk asi. 
   return async( dispatch, getState ) => {

      //recupera del store el valor de notes.
      const { active: activeNote } = getState().notes;     

      Swal.fire({
         title: 'Uploading...',
         text: 'Please whait',
         allowOutsideClick: false,
         showConfirmButton: false,
         willOpen: ()=> {
            Swal.showLoading();
         }
      })

      const fileUrl = await fileUpload(file);

      // console.log('fileURL=>>',fileUrl);
      activeNote.url =fileUrl;

      dispatch( startSaveNote(activeNote) );

      Swal.close();


   }

}




