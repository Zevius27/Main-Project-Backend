import { Router } from "express";
import { loginUser, logOut, registerUser, refreshAccessToken, currentPasswordChange, getCurrentUser, updateAccountDetails, updateUserAvatar, updateUserCoverIMG, getUserChannelProfile } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.model.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


router.route("/register").post(
   upload.fields([
      {
         name: "avatar",
         maxCount: 2,
         message: "Avatar not uploaded, try again later "
      },
      {
         name: "coverIMG",
         maxCount: 2,
         message: "CoverIMG not uploaded, try again later "
      }
   ]),
   registerUser)
//http://localhost:8080/api/v1/users/register


router.route("/login").post(loginUser)



//secured routes
router.route("/logout").post(
   verifyJWT,
   logOut)

router.route("/refreshToken").post(refreshAccessToken)


router.route("/changePassword").post(verifyJWT, currentPasswordChange)

router.route("/currrentUser").get(verifyJWT,
   getCurrentUser
)

router.route("/updateAccount").patch(verifyJWT, updateAccountDetails)

router.route("/updateAvatar").patch(verifyJWT, upload.single("avatar"),updateUserAvatar ) 

router.route("/updateCoverIMG").patch(verifyJWT, upload.single("coverIMG"),updateUserCoverIMG )



router.route("/profile/:username").get(verifyJWT,getUserChannelProfile)

router.route("/watchHistory/:id").get(verifyJWT)







export default router