import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NotesScreen = () => {
   return (
      <div className='notes__main-content'>

         <NotesAppBar/>

         <div className='notes__content'>
            <input 
               type="text" 
               placeholder='Some Awesome title' 
               className='notes__title-input'
               autoComplete='off' 
            />

            <textarea 
               className='notes__textarea'
               placeholder='What happend today'
             ></textarea>

            <div className='notes__image'>
               <img src="https://picsum.photos/700/300" alt="iamgen" />
            </div>

         </div>

      </div>
   )
}
