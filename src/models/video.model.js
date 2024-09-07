import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const VideoSchema = new mongoose.Schema({
   videoFile: {
      type: String,// url of the video
      required: true
   },
   title: {
      type: String,// url of the video
      required: true
   },
   description: {
      type: String,
      required: true
   },
   thumbnail: {
      type: String,// url of the video
      required: true
   },
   duration: {
      type: String,// url of the video
      required: true
   },
   views: {
      type: Number,
      default:0
   },
   isPublished: {
      type: Boolean,
      default: false
   },
   owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
   }
}, { timestamps: true });

VideoSchema.plugin(mongooseAggregatePaginate);  
export const Video = mongoose.model("Video", VideoSchema)