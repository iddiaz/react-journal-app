import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NotesAppBar } from './NotesAppBar'
import { useForm } from './../../hooks/useForm';
import { activeNote, startDeleting } from '../../actions/notes';

export const NotesScreen = () => {

   //renombra el objeto que llega del store
   const {active: note } = useSelector( state => state.notes );
   const [ formValues, handleInputChange, reset ] = useForm( note );
   const {body, title, id} = formValues;
   
   const activeId = useRef( note.id );

   const dispatch = useDispatch();  

   useEffect(() => {

      if( note.id !== activeId.current ){
         reset(note);
         activeId.current = note.id;
      }

    
   }, [note, reset ])

   useEffect(() => {

      // console.log(formValues);
     dispatch( activeNote(formValues.id, {...formValues} ) )
      
   }, [formValues, dispatch])


   const handleDelete = ()=>{
    
      dispatch( startDeleting( id ) );

   }



   return (
      <div className='notes__main-content'>

         <NotesAppBar/>

         <div className='notes__content'>
            <input 
               type="text" 
               placeholder='Some Awesome title' 
               className='notes__title-input'
               autoComplete='off' 
               value={ title }
               name='title'
               onChange={handleInputChange}
            />

            <textarea 
               className='notes__textarea'
               placeholder='What happend today'
               value={ body }
               name='body'
               onChange={handleInputChange}
             ></textarea>

             {
               (note.url) 
               && (<div className='notes__image'>
                     {/* <img src="https://picsum.photos/700/300" alt="iamgen" /> */}
                     <img src={ note.url } alt="iamgen" />
                  </div>)
             }


         </div>


         <button className='btn btn-danger' onClick={handleDelete}>
            Delete
         </button>

      </div>
   )
}
