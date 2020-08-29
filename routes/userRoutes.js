const express=require("express");
const { Router } = require("express");
const router=express.Router();
const {check,validationResult}=require("express-validator");
const bcrypt=require("bcrypt")
// USER CONTROLLER
const {loadLogin,loadSignup,registerValidations,postResgister,postLogin,loginValidations}= require("../controllers/userController")
const{stopLogin}=require("../middlewares/auth");


router.get("/",stopLogin,loadSignup);
router.get('/login',stopLogin,loadLogin);
router.post("/register",registerValidations,postResgister)
router.post('/postLogin',loginValidations,postLogin);

module.exports=router;