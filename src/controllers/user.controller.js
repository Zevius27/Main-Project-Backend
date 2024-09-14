import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { userModel } from "../models/user.model.js"
import { asyncHandler } from "../utils/asynhandler.js";
import { apiError } from "../utils/apiError.js";
// import {upload} from "../middlewares/multer.model.js";  


const generateAccessRefreshTokens = async (userId) => {
   try {
      await userModel.findById(userId)
      const refreshToken = user.generateRefreshToken()
      const accessToken = user.generateAccessToken()
      user.refreshToken = refreshToken
      await user.save({ vaildateBeforeSave: false })

      return { accessToken, refreshToken }


   } catch (error) {
      throw new apiError(500, "something went wrong", error)
   }
}

const registerUser = asyncHandler(async (req, res) => {
   // res.status(200).json({ message: "registerUser code 200 " })
   // STEPS FOR CREATING A USER  
   // get user details from frontend
   // validation - not empty
   // check if user already exists: username, email
   // check for images, check for avatar
   // upload them to cloudinary, avatar
   // create user object - create entry in db
   // remove password and refresh token field from response
   // check for user creation
   // return res



   const { fullname, email, username, password } = req.body
   // console.log("email: ", email);

   //   console.log("email: ", email,
   //    "password: ", password
   //   );

   if (!fullname || !email || !username || !password) {
      throw new apiError(400, "All fields are required")
   }
   const existedUSER = await userModel.findOne(
      { $or: [{ email: email }, { username: username }] }
   )

   if (existedUSER) {
      throw new apiError(409, "User already exists")
   }


   console.log("req.files:", req.body);
   // const coverIMGLocalPath = req.files?.coverIMG[0]?.path;

   // console.log(  "coverIMG: ", req.files.coverIMG);
   // console.log(  "avatar: ", req.files);
   const avatarLocalPath = req.files?.avatar[0]?.path;
   if (avatarLocalPath === undefined) {
      throw new apiError(400, "Avatar is undefined");
   }
   // console.log("req.file.avatar:", req.files?.avatar);
   // console.log("req.file.avatar[0]:", req.file?.avatar);
   // console.log("req.file.avatar[0].path:", req.file?.avatar?.path);
   // console.log(coverIMGLocalPath);

   if (!avatarLocalPath) {
      throw new apiError(400, "All fields are required mainly avatar")
   }
   // console.log("avatarLocalPath: ", avatarLocalPath);

   const avatar = await uploadOnCloudinary(avatarLocalPath)
   // const coverIMG = await uploadOnCloudinary(coverIMGLocalPath)

   if (!avatar) {
      console.log("avatar not uploaded" + avatar);

      throw new apiError(400, "Avatar not uploaded, try again later ")
   }

   const user = await userModel.create({
      fullname,
      email,
      username: username.toLowerCase(),
      password,
      avatar: avatar.url,
      // coverIMG: coverIMG.url || ""
   })



   const newUser = await userModel.findById(user._id).select("-password -refreshToken")// changed user to userModel
   if (!newUser) {
      throw new apiError(400, "User not created, try again later")
   }
   return res.status(201).json(
      new apiResponse(201, newUser, "User created")
   )


})


const loginUser = asyncHandler(async (req, res) => {
   // take the input from frontend
   // check if user exists
   // check if password is correct
   // generate access token
   // generate refresh token
   // remove password and refresh token from response
   // send response
   const { username, password, email } = req.body;
   if (!username || !email) {
      throw new apiError(400, "username or email is required")
   }

   const user = await userModel.findOne({
      $or: [{ email }, { username }],
   })


   if (!user) {
      throw new apiError(404, "User not found")
   }

   const isPasswordCorrect = await user.isPasswordCorrect(password)

   if (!isPasswordCorrect) {
      throw new apiError(401, "Password is incorrect")
   }


   const { accessToken, refreshToken } = await generateAccessRefreshTokens(user._id)

   const loginUser = await userModel.findById(user._id).select("-password -refreshToken")



   const options = {

      httpOnly: true,
      secure: true
   }

   return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new apiResponse(200, loginUser, "Login successful"))
})




const logOut = asyncHandler(async (req, res) => {
   await userModel.findByIdAndUpdate(req.user._id, {
      $set: {
         refreshToken: undefined
      }
   })
   const options = {
      httpOnly: true,
      secure: true
   }

   return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new apiResponse(200, {}, "Logout successful"))
})


export { registerUser, loginUser, logOut }  