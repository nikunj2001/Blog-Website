const mongoose = require("mongoose");
// Connect Mongodb

 connection= async()=>{
     try{

    await mongoose.connect("mongodb://localhost");
    mongoose.connect("mongodb://127.0.0.1/Youtube",{useNewUrlParser: true, useUnifiedTopology: true})
    console.log("MONGO DB CONNECTED");
     }catch(err){
         console.log(err);
     }
}

connection();


// DEFINE SCHEMA
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true
    },
    phone:Number
},{timestamps:true})
// CRATE MODEL
const Users=mongoose.model("user",userSchema);
// const name="nik";
// const email="nikunjguptagmail.com"
// const phone=8445445454
// const newUser = new Users({
//     name,email,phone
// })
// newUser.save().then(user=>{
//     console.log(user)
// }).catch(err=>{
//     console.log("ERRORRRR");
// })

Users.find({_id:'5f38fe86e0743d1ec8c5e34a'}).then(users=>{
    console.log(users)
}).catch(error=>{
    console.log(error);
})


