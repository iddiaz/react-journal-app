import React, {useEffect,  useState} from 'react'
import { 
   BrowserRouter as Router,
   Switch,
   Redirect
} from "react-router-dom";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from './../components/journal/JournalScreen';
// import { LoginScreen } from './../components/auth/LoginScreen';
// import { RegisterScreen } from './../components/auth/RegisterScreen';
import { login } from './../actions/auth';

import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

// import { loadNotes } from '../helpers/loadNotes';
// import { setNotes } from '../actions/notes';
import { startLoadingNotes } from './../actions/notes';




//Nota Implementación: react-router-dom v5 https://v5.reactrouter.com/web/guides/quick-start

export const AppRouter = () => {

   const dispatch =   useDispatch();

   const [checking, setChecking] = useState(true);
   const [isLoggedIn, setIsLoggedIn] = useState(false)

   useEffect(() => {
      
      const auth = getAuth();
      onAuthStateChanged(auth, async(user) => {

         if( user?.uid ) {
            dispatch( login( user.uid, user.displayName ) );
            setIsLoggedIn(true);

            // const notes = loadNotes( user.uid );
            // dispatch( setNotes( notes ) );
            dispatch( startLoadingNotes(user.uid ));
            
            
         } else {
            setIsLoggedIn(false);
         }
         
         setChecking(false);
      }) 

   }, [dispatch, setChecking, setIsLoggedIn])

   if(checking){
      return (
         <h1>Wait...</h1>
      )
   }

   return (
      <Router>
         <div>
            <Switch>

               <PublicRoute 
                  path="/auth" 
                  component={AuthRouter}
                  isAuthenticated={isLoggedIn}
               />             

               <PrivateRoute 
                  exact 
                  isAuthenticated={isLoggedIn}
                  path="/" 
                  component={JournalScreen}
               />
              

               {/* <Route exact path="/auth/login" component={LoginScreen} />
               <Route exact path="/auth/register" component={RegisterScreen} /> */}

               <Redirect to="/auth/login" />

            </Switch>
         </div>
         
      </Router>
   )
}
