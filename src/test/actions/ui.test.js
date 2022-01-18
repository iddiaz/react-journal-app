import { setError, removeError, startLoading, finishLoading } from './../../actions/ui';
import { types } from './../../types/types';


 describe('pruebas en ui-actions', ()=>{

   test('Todas las acciones deben funcionar ', () => {

      const errDesc = 'Error!!!';
      const action = setError( errDesc )

      expect(action ).toEqual({
         type: types.uiSetError,
         payload: errDesc
      })


      const removeErrorAction = removeError();
      const startLoadingAction = startLoading();
      const finishLoadingAction = finishLoading();

      expect( removeErrorAction ).toEqual({
         type: types.uiRemoveError
      })
      expect( startLoadingAction ).toEqual({
         type: types.uiStartLoading
      })
      expect( finishLoadingAction ).toEqual({
         type: types.uiFinishLoading 
      })
      
   }) 
   

 })