const cloudinary = require('cloudinary').v2


cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
    secure: true
});
//EXPORTACION DEL POR DEFAULT DEL METODO uploadImage
module.exports.uploadImage = async(filePath) => {
    //SUBIR LA IMAGEN EN LA CARPETA PORTAFOLIO
    return await cloudinary.uploader.upload(filePath,{folder:'portafolio'})
}

module.exports.deleteImage = async (publicId)=>{
    
    return await cloudinary.uploader.destroy(publicId)
}