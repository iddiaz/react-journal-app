import React from 'react'
import { Link } from "react-router-dom";
import { useForm } from './../../hooks/useForm';

export const RegisterScreen = () => {

   const [formValues, handleInputChange] = useForm({
      name: 'Juan',
      email: 'Juan@correo.com',
      password: '123456',
      password2: '123456'
   });

   const {name,email,password,password2} = formValues;

   const handleRegister = (event) =>{
      event.preventDefault();
      // console.log(name,email, password, password2);

      if( isFormValid() ) {
         console.log('formulario correcto');
      }

   }

   const isFormValid = () => {

      if(name.trim().length <=0 ) {
         console.log('name is required');
         return false;
      }
      else if( email )

      return true;

   }


   return (
      <>
      <h3 className="auth__title">Register</h3>

      <form action="" onSubmit={ handleRegister }>
         <div className='auth__alert-error'>Hola mundo</div>
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
