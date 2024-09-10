// require("dotenv").config({ path: "./.env" });
import dotenv from "dotenv";
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import app from "./app.js";


dotenv.config({
path: "./.env",
})
connectDB().then(() => {
   app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
   })
}).catch ((err) => {
   console.log("DB not connected",err)
})


/*
import express from "express";

; (async () => {
   try {
      await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
      app.on("error",
         (err) => {
            console.log(err)
            throw err
         }
      )
      app.listen(process.env.PORT, () => {
         console.log(`Server is running on port ${process.env.PORT}`);
         
      })
   } catch (err) {
      console.log(err)
      throw err
   }
})()
   

*/