// const express = require("express");
import express from "express";
import Hello from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import cors from "cors";
import ModuleRoutes from "./modules/routes.js";
import "dotenv/config";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
import session from "express-session";
import "dotenv/config";

const app = express();
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(CONNECTION_STRING);

const allowedOrigins = [
    'http://localhost:3000',
    'https://a6--zesty-snickerdoodle-1cad7a.netlify.app'
  ];
  
  app.use(cors({
    credentials: true,
    origin: function(origin, callback){
      // allow requests with no origin (like mobile apps, curl requests)
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  }));
  
// app.use(cors({
//     credentials: true,
//     origin: 'https://a6--zesty-snickerdoodle-1cad7a.netlify.app'
// }));

CourseRoutes(app);

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
app.use(session(sessionOptions));


app.use(express.json());
UserRoutes(app);
ModuleRoutes(app);

Lab5(app);
Hello(app);

app.listen(process.env.PORT || 4000);