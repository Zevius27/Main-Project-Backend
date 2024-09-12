import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/temp');
  },
  filename: (req, file, cb) => {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 19);
    // console.log("req:", req);
    
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export { upload };