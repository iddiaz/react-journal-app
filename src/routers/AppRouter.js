import React from 'react'
import { 
   BrowserRouter as Router,
   Switch,
   Route,
   Redirect,
   Link
} from "react-router-dom";

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from './../components/journal/JournalScreen';
// import { LoginScreen } from './../components/auth/LoginScreen';
// import { RegisterScreen } from './../components/auth/RegisterScreen';



//Nota Implementación: react-router-dom v5 https://v5.reactrouter.com/web/guides/quick-start

export const AppRouter = () => {
   return (
      <Router>
         <div>
            <Switch>
               <Route path="/auth" component={AuthRouter}/>
               <Route exact path="/" component={JournalScreen}/>

               {/* <Route exact path="/auth/login" component={LoginScreen} />
               <Route exact path="/auth/register" component={RegisterScreen} /> */}

               <Redirect to="/auth/login" />

            </Switch>
         </div>
         
      </Router>
   )
}
