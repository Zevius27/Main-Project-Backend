import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.model.js";

const router = Router();


router.route("/register").post(
   upload.fields([
      {
         name: "avatar",
         maxCount: 2,
         message: "Avatar not uploaded, try again later "
      },
      {
         name : "coverIMG",
         maxCount: 2,
         message: "CoverIMG not uploaded, try again later "
      }
   ]),  
   registerUser)
//http://localhost:8080/api/v1/users/register
export default router