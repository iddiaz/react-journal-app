
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { types } from '../../types/types';
import { login, logout, startLoginEmailPassword, startLogout } from './../../actions/auth';


const middlewares = [ thunk ];
const mockStore = configureStore(middlewares) 


const initState = {}  

let store = mockStore( initState );




describe('Pruebas con las accione de auth', ()=>{

   beforeEach(()=>{
      store = mockStore(initState)
   });

   test('Login y logout deben crear la acción respectiva', () =>{

      const uid ='AB123';
      const displayName = 'Ivan';

      const loginAction = login(uid, displayName);
      const logoutAction = logout();

      expect (loginAction).toEqual({
         type: types.login,
         payload: {
            uid,
            displayName
         }

      })
      // console.log(logout());

      expect(logoutAction).toEqual({
         type: types.logout
      })


   

   });


   test('Debe realizar el StartLogout', async()=>{

      await store.dispatch(  startLogout() );
      const actions = store.getActions();
      // console.log('actions ===', actions);  

      expect ( actions[0] ).toEqual({
         type: types.logout
      })
      expect ( actions[1] ).toEqual({
         type: types.notesLogoutCleaning 
      })

   }) 
   
   test('Debe iniciar el startLoginEmailAndPassword', async() => {

     await store.dispatch( startLoginEmailPassword( 'test@test.com', '123456') );
     const actions = store.getActions();
   //   console.log('actions===',actions);

     expect( actions[1]).toEqual({
         type: types.login,
         payload: {
            uid: '3TzBeSLwVzRKp02faqywiD2g1mz2',
            displayName: null 
         }
     })



   });
   

})