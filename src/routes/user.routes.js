import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.model.js";

const router = Router();


router.route("/register").post(
   upload.fields([
      {
         name: "avatar",
         maxCount: 2
      },
      {
         name : "coverIMG",
         maxCount: 2
      }
   ]),  
   registerUser)
//http://localhost:8080/api/v1/users/register
export default router