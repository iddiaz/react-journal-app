
import { types } from './../../types/types';


describe('Pruebas archivo types', () => {

   const typesTest = {

      login: '[Auth] Login',
      logout: '[Auth] Logout',
   
      uiSetError: '[UI] Set Error',
      uiRemoveError: '[UI] Remove Error',
   
      uiStartLoading: '[UI] Start loading',
      uiFinishLoading: '[UI] Finish loading',
   
      notesAddNew: '[NOTES] New note',
      notesActive: '[NOTES] Set active note',
      notesLoad: '[NOTES] Load notes',
      notesUpdated: '[NOTES] Updated note',
      notesDelete: '[NOTES] Delete note',
      notesLogoutCleaning: '[NOTES] Logout Cleaning',
   
   }


   test('Debería ser igual que types', ()=> {


      expect( types ).toEqual( typesTest ); 

   })
})