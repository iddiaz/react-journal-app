

export const fileUpload =async( file )=>{

   //retur url de la imagen
   const cloudUrl =  'https://api.cloudinary.com/v1_1/dl0ibqjtm/upload';

   const formData = new FormData();
   formData.append('upload_preset', 'react-journal');
   formData.append('file', file );

      try {
         const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
         });

         // console.log('resp', resp );

         if ( resp.ok ) {
            
            const cloudResp = await resp.json();
            return cloudResp.secure_url;

         } else {
            // throw await resp.json();
            return null;
         }
         
      } catch (error) {
         console.log(error)
         throw error;
      }

}