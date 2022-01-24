

import { React } from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';


import { NotesScreen } from './../../../components/notes/NotesScreen';
import { activeNote } from '../../../actions/notes';



jest.mock('../../../actions/notes', ()=>({
   activeNote: jest.fn(),

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
      active: {
         id:'2UDDeX88Km4Ph2gU6dnS',
         date: 1642426115032,
         title:'Segunda Nota',
         body:'lorem ipsum!!!',
         url:'https://res.cloudinary.com/dl0ibqjtm/image/upload/v1642426145/k6jeebbankd7isnkp1j8.png'
      },
      notes: [] 
   }
} 

let store = mockStore( initState ); 

//Acciones asincronas hay que simular el dispatch 
store.dispatch = jest.fn();


const wrapper = mount( 

   <Provider store={ store }>
     
         <NotesScreen/> 
      
   </Provider>  
   
)


describe('Pruebas en <NotesScreen/>', ()=>{
  
   test('Debe mostrarse correactamente', ()=> {

      expect (wrapper).toMatchSnapshot();

   });

   test('Debe disparar el activeNote', () => {
      // simula cambio en la caja de texto para comprovar la activacion de activeNote
      wrapper.find('input[name="title"]').simulate('change', {
         target:{
            name: 'title',
            value: 'Hola de nuevo'
         }
      });

      expect(activeNote).toHaveBeenLastCalledWith(
         '2UDDeX88Km4Ph2gU6dnS',
         {
            body:'lorem ipsum!!!',
            title: 'Hola de nuevo',
            id:'2UDDeX88Km4Ph2gU6dnS',
            date: 1642426115032,
            url:'https://res.cloudinary.com/dl0ibqjtm/image/upload/v1642426145/k6jeebbankd7isnkp1j8.png'
         }
      );  
   });
   

});