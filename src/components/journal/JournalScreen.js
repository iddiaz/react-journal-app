import React from 'react'
import { Sidebar } from './Sidebar';
import { NothingSelected } from './NothingSelected';
import { NotesScreen } from './../notes/NotesScreen';
import { useSelector } from 'react-redux';

export const JournalScreen = () => {
   
   //Extrae algo del store
   const {active} = useSelector( state => state.notes );



   return (



      <div className='journal__main-content'>
         <Sidebar />

         <main>

            {
               ( active )
                  ? ( <NotesScreen/> )
                  : ( <NothingSelected/> )
                  
            }           
           
         </main>
      </div>
   )
}
