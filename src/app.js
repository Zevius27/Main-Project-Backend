import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors(
   {
      origin: process.env.CORS_ORIGIN,
      credentials: true
   }
)); // Cross origin resource sharing


app.use(express.json({limit:"14kb"}));
app.use(express.urlencoded({extended:true,limit:"14kb"}));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users",userRouter);

export default app;