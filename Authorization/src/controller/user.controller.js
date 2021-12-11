const express=require('express');
const User=require('../model/user.model')
const router=express.Router();
router.get('/',async(req,res)=>{
    const user=await User.find().lean().exec();
    res.send(user)
});
module.exports=router;