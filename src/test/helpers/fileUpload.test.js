import { fileUpload } from "../../helpers/fileUpload";
import cloudinary from 'cloudinary';
// var cloudinary = require('cloudinary').v2

cloudinary.config({ 
   cloud_name: 'dl0ibqjtm', 
   api_key: '467718272341682', 
   api_secret: 'zyjz_C8j6AAj18af4Tnvl-ipEZw',

 });

describe('pruebas en fieUpload', ()=>  {
  
   test('Debe cargar un archivo y retornar el URL', async(  ) => {
      
      const urlImg = 'https://st.depositphotos.com/1020341/4233/i/600/depositphotos_42333899-stock-photo-portrait-of-huge-beautiful-male.jpg'
      const resp = await fetch(urlImg);
      const blob = await resp.blob();

      const file = new File([ blob ], 'foto.png') // creamos FIle para las simulaciones. 

      const url = await fileUpload( file );
      console.log(url) 

      expect( typeof url).toBe('string');  

      //Borrar imagen del cloud cloudinary
      const segments = url.split('/');
      const imageId = segments[ segments.length -1 ].replace('.jpg', '');  
      console.log(imageId);

      cloudinary.v2.api.delete_resources( imageId );

   })
   test('Debe retornar un error', async() => {       
     
      const file = new File([], 'foto.png') // creamos FIle para las simulaciones.

      const url = await fileUpload( file );
      // console.log(url) 

      expect( url).toBe( null ); 
   })
   
})