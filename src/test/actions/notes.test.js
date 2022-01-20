/**

* @jest-environment node

*/
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { db } from '../../firebase/firebase-config';
import { doc,  deleteDoc, getDoc } from "firebase/firestore";
import { types } from '../../types/types';
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from './../../actions/notes';
import { fileUpload } from './../../helpers/fileUpload';


jest.mock('../../helpers/fileUpload', () => {
   return {
       fileUpload: () => {
           return Promise.resolve(
               "https://misfotos.com/photo.png"
           );
       },
   };
});


 
const middlewares = [ thunk ];
const mockStore = configureStore(middlewares) 


const initState = {
   auth: {
   uid: 'TESTING',
   },
   notes: {
      active: {
         id: '9kq1UBUPSVA4cbJxkWno',
         title: 'Hola',
         body: 'mundo'
      }
   }
}  


   


//este objeto es el estado del store en este instante
let store = mockStore( initState );

describe('Pruebas con las acciones de notas', ()=>{

   beforeEach( ()=>{
      store = mockStore(initState);

   })
   
   
   test('Debe crear una nueva nota startNewNote', async() =>{

      await store.dispatch( startNewNote() );  

      const actions = store.getActions(); 

      // console.log(actions);

      expect( actions[0]).toEqual({
         type: types.notesActive,
         payload: {
            id: expect.any(String),
            title: '',
            body: '',
            date: expect.any(Number)
         }
      });

      expect( actions[1]).toEqual({
         type: types.notesAddNew,
         payload: {
            id: expect.any(String),
            title: '',
            body: '',
            date: expect.any(Number)
         } 
      });


      // delete document
      // console.log(actions[0].payload.id );
      const docId = actions[0].payload.id; 
      const noteRef = doc(db, `TESTING/journal/notes/${ docId }`)

      await deleteDoc(noteRef);      

 
   }) 
   
   
   test('StartLoadingNotes debe caregar las notas', async()=>{

      await store.dispatch( startLoadingNotes('TESTING') );  
      const actions = store.getActions();
      // console.log(actions); 
      const expected = {
         id: expect.any(String),
         title:expect.any(String),
         body: expect.any(String),
         date: expect.any(Number)
      }

      expect( actions[0].payload[0] ).toMatchObject( expected );

   })


   test('StartSaveNote debe actualizar la nota', async()=>{

      const note = {
         id: '9kq1UBUPSVA4cbJxkWno',
         title: 'Titulo',
         body: 'body actualziado'
      } 

      await store.dispatch( startSaveNote(note) );
      const actions = store.getActions();
      // console.log(actions);

      expect( actions[0].type ).toBe( types.notesUpdated );

      const docId = note.id; 
      const docRef = await doc(db, `TESTING/journal/notes/${ docId }`);      
      const docSnap = await getDoc(docRef);
      // console.log('docSnap', docSnap.data() );

      expect( docSnap.data().title ).toBe( note.title );

        

   });


   test('StartUploading debe actualizar el url del entry', async()=> {

      const file = [];

      await store.dispatch( startUploading(file) );

      const docRef = await doc(db, `TESTING/journal/notes/9kq1UBUPSVA4cbJxkWno`);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data().url); 

      expect( docSnap.data().url ).toBe( 'https://misfotos.com/photo.png' );  



   })




})