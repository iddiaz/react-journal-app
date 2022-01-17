import Swal from 'sweetalert2';

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { googleAuthProvider } from '../firebase/firebase-config';
import { types } from './../types/types';
import { finishLoading, startLoading } from './ui';
import { notesLogoutCleaning } from './notes';




export const login = (uid, displayName) => ({ 
  
      type: types.login,
      payload: {
         uid,
         displayName
      }
   
})

export const startLoginEmailPassword = ( email, password ) =>{

   return (dispatch)=>{

      const auth = getAuth();

      dispatch( startLoading() );

      signInWithEmailAndPassword( auth, email, password )
         .then( ({user}) => {
            console.log(user);
            dispatch( login( user.uid, user.displayName ) );
            console.log('finidh?')
            dispatch( finishLoading() );   
              
         }).catch( (err) => {
          
            const dataErr = JSON.stringify( err.code );   
            const errorMessage= dataErr.replace(/['"]+/g, '');        

            dispatch( finishLoading() );          
      
            Swal.fire('Error', errorMessage, 'error' );
         })
          
        
      
   }
}

export const startGoogleLogin = () => {
  
   return (dispatch) => {

      const auth = getAuth();
      signInWithPopup(auth, googleAuthProvider)
         .then( ({user}) => {
            // console.log(userCred);
            dispatch(login(user.uid, user.displayName))
         })
      // .then(({user}) =>{
      //     dispatch(login(user.uid, user.displayName))
      // });

   }


}


export const startRegisterWithEmailPasswordName = ( email, password, name ) => {

   //como es asincrona neesita retornar el callback
   //tengo acceso al dispach aqui gracias al thunk
   return ( dispatch ) => {

      const auth = getAuth();
      createUserWithEmailAndPassword( auth, email, password )
         .then( async({user}) =>{
            await updateProfile( user, {displayName: name});
            console.log(user);
            dispatch( login( user.uid, user.displayName ))

         }).catch( err =>{
            console.log(err);
            const dataErr = JSON.stringify( err.code );   
            const errorMessage= dataErr.replace(/['"]+/g, '');  
            Swal.fire('Error', errorMessage, 'error' );
         })
   
   }

}

export const startLogout = ()=>{
   return(dispatch)=>{
      const auth = getAuth();
      signOut( auth ).then( ()=>{
         console.log('logout from firestore!!');
         dispatch( logout() );
         dispatch( notesLogoutCleaning() );


      } )


   }
}

export const logout = () => ({

   type:types.logout   
   
})






