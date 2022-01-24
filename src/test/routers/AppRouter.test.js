

import { React } from 'react';
import { mount } from 'enzyme';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { login } from '../../actions/auth';
import { AppRouter } from './../../routers/AppRouter';
import { act } from '@testing-library/react';

import {db} from '../../firebase/firebase-config';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


jest.mock('../../actions/auth', ()=>({
   login: jest.fn(),

}))

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares) 


const initState = {
   auth: {},
   ui: {
      loading: false,
      msgError: null
   },
   notes: {
      active: {
         id: 'ABC'
      },
      notes: [] 

   }
}  
let store = mockStore( initState ); 

//Acciones asincronas hay que simular el dispatch 
store.dispatch = jest.fn();


describe('Test en <AppRouter/>', ()=>{

   test('Debe llamar al login si estoy atenticado', async()=>{

      const auth = getAuth();
      const { email, password } = {
         email : 'test@test.com',
         password : '123456'
      }  

      let user;
      
      
      
      await act( async()=>{

            const userCred = await signInWithEmailAndPassword(auth, email, password );
            user = userCred.user;
            
            // console.log('user===', user);

            const wrapper = mount( 
            
               <Provider store={ store }>
                  <MemoryRouter>
                     <AppRouter /> 
                  </MemoryRouter>
               </Provider>
            )
      })  


      expect( login ).toHaveBeenCalledWith('3TzBeSLwVzRKp02faqywiD2g1mz2', null);
   

   })
})