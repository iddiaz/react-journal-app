import { types } from './../types/types';

/*

   {
      uid:adshkf70897a8df,
      name:'Ivan'
   }

*/

// reducer de la autenticacion
export const authReducer = ( state = {}, action ) => {
   
   switch ( action.type ) {
      case types.login:
         
         return {
            uid: action.payload.uid,
            name: action.payload.displayName
         }
   
      case types.logout:         
         return {}
   
      default:      
         return state;
   }

}