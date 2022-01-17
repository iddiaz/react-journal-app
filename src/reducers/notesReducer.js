/*
import { Switch } from 'react-router-dom';
import { types } from './../types/types';
   {
      nodets: [],
      active: null,
      active: {
         id:'GTASVWER243867r9782436',
         title: '',
         body: '',
         iamgeUrl: '',
         date: '1265367e'
      }
   }

*/
import { types } from "../types/types";

 


const initialState = {
   notes: [],
   active: null
}

export const notesReducer = ( state = initialState, action )=>{

   switch (action.type) {

      case types.notesActive:
         return {
            ...state,
            active: {
               ...action.payload
            }
         }
      
      case types.notesAddNew:
         
         return {
            ...state,
            notes: [ action.payload, ...state.notes ]
         }
      

      case types.notesLoad:
         // console.log( action.payload );
         return {
            ...state,
            notes: [ ...action.payload ]
               
            
         }

      case types.notesUpdated:
       
         return {
            ...state,
            notes: state.notes.map(
               note => note.id === action.payload.id
                  ? action.payload.note
                  : note
            )
               
            
         }    

      case types.notesDelete:
       
         return {
            ...state,
            active: null,
            notes: state.notes.filter( note => note.id !== action.payload )               
            
         } 

      case types.notesLogoutCleaning:
       
         return {
            ...state,
            active: null,
            notes: []              
            
         }    
         
   
      default:
         return state;
   }  

}