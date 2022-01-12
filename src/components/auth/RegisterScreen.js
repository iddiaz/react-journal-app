import React from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from './../../hooks/useForm';
import validator from "validator";
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';


export const RegisterScreen = () => {

   const [formValues, handleInputChange] = useForm({
      name: 'Juan',
      email: 'Juan@correo.com',
      password: '123456',
      password2: '123456'
   });

   const {name,email,password,password2} = formValues;

   const dispatch = useDispatch();
   const {msgError } = useSelector( state => state.ui );
   console.log(msgError);

   const handleRegister = (event) =>{
      event.preventDefault();
      // console.log(name,email, password, password2);

      if( isFormValid() ) {
         console.log('formulario correcto');
         dispatch( startRegisterWithEmailPasswordName( email, password, name ) );
      }

   }


   const isFormValid = () => {

      if(name.trim().length === 0 ) {       
       
         dispatch( setError( 'name is required') );
         return false;

      } else if( !validator.isEmail( email ) ) {
         
         dispatch( setError('Email is not valid') );
         return false;

      } else if ( password !== password2 || password.length < 5 ){         
         
         dispatch( setError('Password shoul be at least 6 characters and match each other') );
         return false;
      }

      dispatch( removeError() )

      return true;

   }


   return (
      <>
      <h3 className="auth__title">Register</h3>

      <form action="" onSubmit={ handleRegister }>

         {
            msgError && (

               <div className='auth__alert-error'>{msgError}</div>

            )
         }
        


         <input className="auth__input" type="text" placeholder="Name" name="name" autoComplete="off" value={name} onChange={handleInputChange} />
         <input className="auth__input" type="text" placeholder="Email" name="email" autoComplete="off" value={email} onChange={handleInputChange}  />
         <input className="auth__input" type="password" placeholder="Password" name="password" value={password} onChange={handleInputChange}  />
         <input className="auth__input" type="password" placeholder="Confirm password" name="password2" value={password2} onChange={handleInputChange}  />

         <button className="btn btn-primary btn-block mb-5" type="submit" >Create Acount</button>
        



         <Link className="link" to={'/auth/login'}>
            Already registered?
         </Link>


      </form>
   </>
   )
}
