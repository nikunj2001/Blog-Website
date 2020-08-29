const express= require("express");
const router = express.Router();

const {postForm,storePost,posts,details,updateForm,postUpdate,postValidations,deletePost} = require("../controllers/postsController")
const{auth}=require("../middlewares/auth")
router.get('/createPost',postForm,auth)
router.post('/createPost',auth,storePost)   
router.get('/posts/:page',auth,posts)
router.get('/details/:id',auth,details);
router.get('/update/:id',auth,updateForm);
router.post('/update',postUpdate,[auth,postValidations]);
router.post('/delete',deletePost,auth);
module.exports = router;