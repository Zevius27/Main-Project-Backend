import jwt from "jsonwebtoken";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asynhandler.js";
import { userModel } from "../models/user.model.js";


export const verifyJWT = asyncHandler(async (req, res, next,) => {
   // console.log("req.cookies: ", req.cookies);
   
   try {
      const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
      // console.log("token: ", token);
      
      if (!token) {
       throw new apiError(401, "Unauthorized") 
      }     
   
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,)
      
      const userDecodedToken = await  userModel.findById(decodedToken?._id).select(
         "-password -refreshToken"
      )
   
      if (!userDecodedToken) {
         throw new apiError(401, "Unauthorized")
         
      }
   
      req.user = userDecodedToken;
      next()
   } catch (error) {
      throw new apiError(401, "Unauthorized",error?.message)
   }

}
)