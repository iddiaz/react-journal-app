
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { db } from '../../firebase/firebase-config';
import { doc,  deleteDoc } from "firebase/firestore";
import { types } from '../../types/types';
import { startNewNote } from './../../actions/notes';

 
const middlewares = [ thunk ];
const mockStore = configureStore(middlewares)

//este objeto es el estado del store en este instante
const store = mockStore({
   auth: {
      uid: 'TESTING',
   }

})

describe('Pruebas con las acciones de notas', ()=>{
   test('Debe crear una nueva nota startNewNote', async() =>{

      await store.dispatch( startNewNote() );  

      const actions = store.getActions();

      console.log(actions);

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
      console.log(actions[0].payload.id );
      const docId = actions[0].payload.id; 
      const noteRef = doc(db, `TESTING/journal/notes/${ docId }`)

      await deleteDoc(noteRef);   
 
      

 
   })  
})