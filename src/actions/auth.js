
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { googleAuthProvider } from '../firebase/firebase-config';
import { types } from './../types/types';
import { finishLoading, startLoading } from './ui';




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
              
         }).catch( err => {
            console.log(err);
            dispatch( finishLoading() );  
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
         })
   
   }

}