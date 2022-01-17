import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from './../../actions/notes';
import { fileUpload } from './../../helpers/fileUpload';

export const NotesAppBar = () => {
   
   const dispatch = useDispatch();
   const { active: note } = useSelector( state => state.notes );

   const handleSave = ()=>{
      // console.log('NOTE??', note);
      dispatch( startSaveNote( note ) );
   }

   const handlePictureClick = () => {
      document.querySelector('#fileSelector').click();
   }

   const handleFileChange = (e)=>{
      // console.log(e.target);
      // console.log('e.target.files=>>', e.target.files);
      const file = e.target.files[0]; 

      if (file) {
         
         dispatch( startUploading(file) );
      }

   }




   return (
      <div className='notes__appbar'>
         <span>28 agosto de 2022</span>
         
         <input 
            id='fileSelector'
            type="file" 
            name='file'
            style={{display: 'none'}} 
            onChange={handleFileChange} 
         />
         

         <div>
            <button className='btn' onClick={ handlePictureClick }>Picture</button>
            <button className='btn' onClick={ handleSave }>Save</button>
         </div>
      </div>
   )
}
