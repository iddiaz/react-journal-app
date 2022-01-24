

import { React } from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';


import { startLogout } from './../../../actions/auth';
import { startNewNote } from './../../../actions/notes';
import { Sidebar } from './../../../components/journal/Sidebar';


jest.mock('./../../../actions/auth', ()=>({
   startLogout: jest.fn(),

}));

jest.mock('./../../../actions/notes', ()=>({
   startNewNote: jest.fn(),

}));

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares) 


const initState = {
   auth: {
      uid: '1',
      name:'Ivan'
   },
   ui: {
      loading: false,
      msgError: null
   },
   notes: {
      active: null,
      notes: [] 
   }
} 

let store = mockStore( initState ); 

//Acciones asincronas hay que simular el dispatch 
store.dispatch = jest.fn();


const wrapper = mount( 

   <Provider store={ store }>
      <MemoryRouter>
         <Sidebar/> 
      </MemoryRouter>
   </Provider> 
   
)


describe(' Pruebas en <Sidebar/>', ()=>{

   test('Debe mostrarse correctamente', ()=>{

      expect( wrapper ).toMatchSnapshot();

   });

   test('Debe llamar a startLogout', ()=>{
      
      wrapper.find('button').prop('onClick')(); 
      expect( startLogout ).toHaveBeenCalled();     
      
   });

   test('Debe llamar a startNewNote', ()=>{
      
      wrapper.find('.journal__new-entry').prop('onClick')(); 
      expect( startNewNote ).toHaveBeenCalled();     
      
   }); 



})