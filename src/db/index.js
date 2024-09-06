import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
   try {

      const conn = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      
   } catch (err) {
      console.log(err)
      process.exit(1)
      // throw err   
   }
}

export default connectDB