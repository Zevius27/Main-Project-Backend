import { v2 as cloudinary } from 'cloudinary';
import { log } from 'console';
import fs from 'fs';




if (cloudinary) {
   // Configuration
   cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
   });
   // Use the uploader object
} else {
   console.error('Cloudinary object is not defined');
}
const uploader = cloudinary.uploader;


const uploadOnCloudinary = async (localFilePath) => {
   try {
      // console.log("localFilePath: ", localFilePath)
      // if (!localFilePath) return null
      const response = await cloudinary.uploader.upload(localFilePath, {
         resource_type: "auto",
      })
      console.log("File uploaded to Cloudinary  ", response.url);
      // log("File uploaded to Cloudinary  ", response);
      fs.unlinkSync(localFilePath) 
      return response;
   } catch (error) {
      log("error: ", error)
      fs.unlinkSync(localFilePath);//remove local file (temporarly saved one)
      return null
   }
}



// Code below is of error with cloudinary
// cloudinary.v2.uploader.upload("img",{
//  // The problem is probabaly with the link of img here

// }, (error, result) => {
//    if (error) {
//       console.log(error);
//    } else {
//       console.log(result);
//    }
// })




export { uploadOnCloudinary }