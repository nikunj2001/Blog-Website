const express = require("express");
const {check,validationResult}=require("express-validator")
const app=express();
const PORT =5000;
const bcrypt=require("bcrypt")
require('dotenv').config();
const session = require("express-session");
const MongoDBStore=require("connect-mongodb-session")(session);
const flash = require("express-flash");
const connect = require("./models/db");
const Users = require("./models/User");
const userRoutes =require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const postRoutes = require("./routes/postRoutes");
// Db CONNECTION
connect();

// EXPRESS SESSION MIDDLE WARE
const store=new MongoDBStore({
    uri:process.env.DB,
    collection:'sessions'
});


app.use(session({
    secret: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: true,
    cookie:{
        maxAge:7*24*60*60*1000
    },
    store
  }))

//   FLASH MIDDLE WARE
app.use(flash())
app.use((req,res,next)=>{
    res.locals.message=req.flash()
    next();
})
// LOAD STATIC FILES
app.use(express.static("./views"))
app.use(express.urlencoded({extended:true}));
// Set ejs
app.set("view engine","ejs");
app.use(userRoutes);
app.use(profileRoutes)
app.use(postRoutes);
// Create server
app.listen(PORT,()=>{
    console.log(`Server running on: ${PORT}`)
});