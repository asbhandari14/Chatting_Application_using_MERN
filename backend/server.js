import express from "express"; 
import dotenv from "dotenv"; 
dotenv.config({});
import connectDB from "./database/connectDB.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./socket/socket.js";

 
const PORT = process.env.PORT || 5000;

// These are the middleware so we can get the Postman data or data send from the user (which is the json data) ,we can get that json data in the VsCode
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));

// This middleware is use to send and get the cookie 
app.use(cookieParser());

// This middleware is so we don't get CORS error when we request the file from frontend which run on different url 
const corsOption={
    origin:'http://localhost:5173',
    methods : ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials:true
};
app.use(cors(corsOption)); 


// Following are the Routes we use 
app.use("/user",userRoute); 
app.use("/message",messageRoute);
 

connectDB().then(()=>{
    server.listen(PORT, (err)=>{
        if(err) console.log(err);
        else{
            console.log("Server is running at the PORT : ", PORT);
        }
    })
})


