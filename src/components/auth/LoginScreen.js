import { Link } from "react-router-dom";
import { useForm } from './../../hooks/useForm';
import {useDispatch, useSelector}  from 'react-redux';
import { login, startGoogleLogin, startLoginEmailPassword } from './../../actions/auth';

export const LoginScreen = () => {
   //useDispach => Da acceso al dispach y poder hacer dispach de acciones.
   const dispatch = useDispatch();  


   const [formValues, handleInputChange] = useForm({
      email:'juan@correo.com',
      password:'123456'
   })

   const { email, password } = formValues;

   const handleLogin = ( e ) =>{
      e.preventDefault();
      console.log(email,password);
      dispatch( startLoginEmailPassword( email, password ) );
      

   }

   const handleGoogleLogin = () => {
      dispatch(startGoogleLogin())
   }

   const {loading} = useSelector( state => state.ui );
   



   return (
      <>
         <h3 className="auth__title">Login</h3>

         <form action="" onSubmit={handleLogin}>
            <input 
               className="auth__input" 
               type="text" 
               placeholder="Email" 
               name="email" 
               autoComplete="off"
               value={email}
               onChange={handleInputChange} />

            <input 
               className="auth__input" 
               type="password" 
               placeholder="Password" 
               name="password"
               value={password}
               onChange={handleInputChange} />

            <button className="btn btn-primary btn-block" type="submit" disabled={loading} >Login</button>
           

            <div className="auth__social-networks">
               <p>Login With Social Networks</p>
               <div className="google-btn" onClick={ handleGoogleLogin }>
                  <div className="google-icon-wrapper">
                     <img
                        className="google-icon"
                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                        alt="google button"
                     />
                  </div>
                  <p className="btn-text">
                     <b>Sign in with google</b>
                  </p>
               </div>
            </div>

            <Link className="link" to={'/auth/register'}>
               Create Account
            </Link>


         </form>
      </>
   );
};
