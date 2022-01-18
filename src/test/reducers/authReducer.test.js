
import { authReducer } from './../../reducers/authReducer';
import { types } from '../../types/types';

describe('Pruebas en authReducer', ()=>{

   test('Debe realizar el login ', () => {

      const initState = {};
      const action = {
         type: types.login,
         payload: {
            uid: 'abc',
            displayName: 'Ivan'
         }
      };

      const state = authReducer( initState, action );

      expect(state).toEqual({
         uid: 'abc',
         name: 'Ivan'
      })
      
   })



   test('Debe realizar el logout ', () => {

      const initState = {
         uid: 'abc',
         displayName: 'Ivan'
      };
      const action = {
         type: types.logout
      };

      const state = authReducer( initState, action );

      expect(state).toEqual({})
      
   })

   
   test('No debe hacer cambios', () => {

      const initState = {
         uid: 'abc',
         displayName: 'Ivan'
      };
      const action = {
         type: 'tipo que no existe' 
      };

      const state = authReducer( initState, action );

      expect(state).toEqual( initState )
      
   })
   
   
}) 