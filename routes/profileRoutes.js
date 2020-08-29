const express=require("express");
const router=express.Router();
const{auth}=require("../middlewares/auth")
const{profile,logout}=require("../controllers/profileController")

router.get('/profile',auth,profile)
router.get("/logout",logout)
module.exports= router;