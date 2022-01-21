
import { React } from 'react';
import { mount } from 'enzyme';
import { RegisterScreen } from './../../../components/auth/RegisterScreen';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import { MemoryRouter } from 'react-router-dom';
import { types } from './../../../types/types';

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares) 

const initState = {
   auth: {},
   ui: {
      loading: false,
      msgError: null
   }  
}  

let store = mockStore( initState ); 
//acciones sincronas no hace falta simular el dispatch
// store.dispatch = jest.fn();

describe('Prubas en <RegisterLoginScreen />', ()=> {

   const wrapper = mount( 
   
      <Provider store={ store }>
         <MemoryRouter>
            <RegisterScreen/> 
         </MemoryRouter>
      </Provider> 
      
   )

   
   test('Debe mostrarse correctamente', () => {

      expect( wrapper ).toMatchSnapshot();
     
   });

   test('Debe hacer el dispatch de la acción respectiva', ()=>{

      const emailField = wrapper.find('input[name="email"]');
      // console.log(emailField.exists());
      emailField.simulate('change', {
         target: {
            value: '',
            name: 'email'
         }
      });

      wrapper.find('form').simulate('submit', {
         preventDefault(){}
      });

      const actions = store.getActions();
      console.log('actions===', actions);

      expect( actions[0] ).toEqual({
         type: types.uiSetError,
         payload: 'Email is not valid'
      }) 

   });


   test('Debe mostrar la caja de alerta con el error', ()=>{

      const initState = {
         auth: {},
         ui: {
            loading: false,
            msgError: 'Email no es correcto'
         }  
      }  
      
      const store = mockStore( initState );       
      
      const wrapper = mount( 
      
         <Provider store={ store }>
            <MemoryRouter>
               <RegisterScreen/> 
            </MemoryRouter>
         </Provider> 
         
      );

      expect( wrapper.find('.auth__alert-error').exists() ).toBe( true );
      expect( wrapper.find('.auth__alert-error').text().trim() ).toBe( initState.ui.msgError );

   })
   

})


