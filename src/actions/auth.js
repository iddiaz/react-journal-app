
import { types } from './../types/types';


// export const login = (uid, displayName) =>{
//    return {
//       type: types.login,
//       payload: {
//          uid,
//          displayName
//       }
//    }
// } 
// ===
export const login = (uid, displayName) => ({ 
  
      type: types.login,
      payload: {
         uid,
         displayName
      }
   
})

export const startLoginEmailPassword = ( email, password ) =>{
   return (dispatch)=>{

      setTimeout(() => {

               dispatch( login(123,'Pedro'));

      }, 3500);

   }
}