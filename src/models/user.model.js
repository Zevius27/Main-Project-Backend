import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
   username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
   },
   email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,

   },
   fullname: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
   },
   avatar: {
      type: String,// gonna use cloudinary later
      required: true,
   },
   coverImage: {
      type: String,

   },
   watchHistory: [
      {
         type: Schema.Types.ObjectId,
         ref: "Video"
      }
   ],
   password: {
      type: String,
      required: [true, "Password is required"],
   },
   refreshToken: {
      type: String
   }
}, { timestamps: true });


userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) return next();
   this.password = await bcrypt.hash(this.password, 10)
})


userSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
   jwt.sign({
      _id: this._id,
      email: this.Email,
      username: this.username,
      fullname: this.fullname
   }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
}

userSchema.methods.generateRefreshToken = function () {
   jwt.sign({
      _id: this._id,
      email: this.Email,
      username: this.username,
      fullname: this.fullnamew
   }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })

}
const user = mongoose.model("User", userSchema)

export const userModel = user;