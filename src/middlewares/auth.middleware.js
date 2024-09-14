import jwt from "jsonwebtoken";
import { apiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asynhandler";
import { userModel } from "../models/user.model";


export const verifyJWT = asyncHandler(async (req, res, next,) => {
   try {
      const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
   
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