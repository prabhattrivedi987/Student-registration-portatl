const cloudinary=require('cloudinary').v2;

const { CloudinaryStorage }=require('multer-storage-cloudinary');

cloudinary.config({ 
    cloud_name: 'dbbssotb4', 
    api_key: '268152238522417', 
    api_secret: 'A_-aus9q-Sbus2WUzZCNXHwP0vg' 
  });

  //instance of  cloudinary storage

  const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    
    allowedFormates:['jpg','png'],
    params:{
        transformation:[{width:500,height:500,crop:"limit"}],
        folder:'register',
    },
  })

  module.exports=storage;