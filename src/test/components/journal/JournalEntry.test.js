

import { React } from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';


import { JournalEntry } from './../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';


jest.mock('../../../actions/notes', ()=>({
   activeNote: jest.fn(),

}));


const middlewares = [ thunk ];
const mockStore = configureStore(middlewares) 


const initState = {};

let store = mockStore( initState ); 

const nota = {
   id:10,
   date:0,
   title: 'HOla',
   body:'que tal',
   url: 'https://algunlugar.com/photo'
}

//Acciones asincronas hay que simular el dispatch 
store.dispatch = jest.fn();


const wrapper = mount( 

   <Provider store={ store }>
 
         <JournalEntry {...nota} /> 
     
   </Provider> 
   
)


describe('Pruebas en <JournalEntry/>', ()=>{

   test('Debe mostrarse correctamente', () =>{
      expect( wrapper).toMatchSnapshot(); 
    });


   test('Debe activar la nota', () =>{
      wrapper.find('.journal__entry').prop('onClick')();
      expect( store.dispatch ).toHaveBeenCalled(); 
      // or
      expect( activeNote ).toHaveBeenCalled();

      // or more specific
      expect( store.dispatch ).toHaveBeenCalledWith(         
         activeNote( nota.id, {...nota} )
      );

   });


});