import multer from "multer";

let dcounter = 0
let counter = 0
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      dcounter++;
      
      // cb(null, "./public/temp")
      
      cb(null, "./public/temp")
   },
   filename: function (req, file, cb) {
      counter++;

      // console.log("req:", req);
      console.log("file:", file);

      cb(null, file.originalname)

      cb(null, file.originalname)

      console.log("counter: ", counter);
      console.log("dcounter: ", dcounter);

   },
   
   filename: function (req, file, cb) {
      counter++;

      // console.log("req:", req);
      console.log("file:", file);

      cb(null, file.originalname)

      console.log("counter: ", counter);
      console.log("dcounter: ", dcounter);

   },
 

})

// console.log("counter: ", counter);
// console.log("dcounter: ", dcounter);

export const upload = multer({ storage, })