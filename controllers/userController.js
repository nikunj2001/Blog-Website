const {check,validationResult}=require("express-validator");
const bcrypt=require("bcrypt")
const Users = require("../models/User");
const jwt = require("jsonwebtoken");

const loadSignup = (req,res)=>{
    title="Create new account"
    const errors=[];
    res.render("register",{title,errors,inputs:{},login:false});
}
const loadLogin=(req,res)=>{
    title="User login"
    res.render("login",{title,errors:[],inputs:{},login:false});
}
const loginValidations = [
    check('email').not().isEmpty().withMessage("Valide email requires"),
    check("password").not().isEmpty().withMessage("Password is requires")
]
const postLogin = async (req,res)=>{
    const{email,password}=req.body;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
       res.render("login",{title:"USER login",errors:errors.array() ,inputs:req.body,login:false})
    }else{
        const checkEmail = await Users.findOne({ email })
        if(checkEmail!==null){
            const id = checkEmail._id;
            const dbPassword=checkEmail.password;
            const passwordVerify= await bcrypt.compare(password,dbPassword)
            if(passwordVerify){
// ADD TOKEn
                const token = jwt.sign({userID:id},process.env.JWT_SECRET,{
                    expiresIn:"7d"
                })
                // CREATE SESSION VARIABLE
                req.session.user=token;
                res.redirect("/profile");
            }else{

            res.render("login",{title:"USER login",errors:[{msg:"Password is Wrong"}],inputs:req.body,login:false})

            }
        }else{
            res.render("login",{title:"USER login",errors:[{msg:"Email is not found"}],inputs:req.body,login:false})
    
        }
    }
}


const registerValidations = [
    check('name').isLength({min:3}).withMessage("NAME IS REQUIRE DAND MUST BE 3 CHAR LONG"),
    check('email').isEmail().withMessage("ENTER A VALUD EMAIL"),
    check("password").isLength({min:6}).withMessage("PASSWORD MUST BE 6 CHARACTER LONG")
]
const postResgister= async(req,res)=>{
    const{name,email,password}=req.body;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const title="Create new Account";
        res.render("register",{title,errors:errors.array(),inputs:req.body,login:false })

    }else{
        try{
        const userEmail=await Users.findOne({email})
        if(userEmail===null){
            const salt=await bcrypt.genSalt(10);
            const hashed=await bcrypt.hash(password,salt);
            console.log(salt)
            const newUser=new Users({
                name:name,
                email:email,
                password:hashed

            }) 
            try {
             const createdUSer=await newUser.save();
             req.flash('success',"Your account has been created sucessfully")
             res.redirect('/login');
        }catch(err){
            console.log(err.message)
        }
        }else{
        res.render("register",{title:"Create new Account",errors:[{msg:"Email already exist"}],inputs:req.body ,login:false});
        console.log("EMAIL ALREADY EXIST");
        }
        console.log(userEmail);
        }catch(err){
            console.log(err.message);
        }
    }
    

}
module.exports={
    loadSignup,
    loadLogin,
    registerValidations,
    postResgister,
    postLogin,
    loginValidations

}