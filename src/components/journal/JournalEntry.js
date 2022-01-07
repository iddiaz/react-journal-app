import React from 'react'

export const JournalEntry = () => {
   return (
      <div className='journal__entry pointer' >
         <div className='journal__entry-picture' style={{
            backgroundSize:'cover',
            backgroundImage:'url(https://picsum.photos/200/200)'
         }}>
         </div>   

         <div className='journal__entry-body'>
            <p className='journal__entry-title'>Un nuevo dia</p>
            <p className='journal__entry-content'>
               Enim exercitation ex qui occaecat ut sint voluptate.
            </p>
         
         </div>    

         <div className='journal__entry-date-box'>
            <span>Monday</span>
            <h4>28</h4>
         </div>  
      </div>
   )
}
