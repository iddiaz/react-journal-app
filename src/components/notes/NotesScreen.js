import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import { NotesAppBar } from './NotesAppBar'
import { useForm } from './../../hooks/useForm';

export const NotesScreen = () => {

   //renombra el objeto que llega del store
   const {active: note } = useSelector( state => state.notes );
   const [ formValues, handleInputChange, reset ] = useForm( note );
   const {body, title} = formValues;

   const activeId = useRef( note.id );

   useEffect(() => {

      if( note.id !== activeId.current ){
         reset(note);
         activeId.current = note.id;
      }

    
   }, [note, reset ])



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
               onChange={handleInputChange}
            />

            <textarea 
               className='notes__textarea'
               placeholder='What happend today'
               value={ body }
               onChange={handleInputChange}
             ></textarea>

             {
               (note.url) 
               && (<div className='notes__image'>
                     <img src="https://picsum.photos/700/300" alt="iamgen" />
                  </div>)
             }


         </div>

      </div>
   )
}
