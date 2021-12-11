const Product=require('../model/product.model');
const express=require('express');
const authenticate=require('../middleware/authenticate')
const authorise=require('../middleware/authorise')
const router=express.Router();
router.post('/',authenticate,async(req,res)=>{
    try {
        const user=req.user;
        const product= await Product.create({
            name:req.body.name,
            price:req.body.price,
            seller:user.user._id
        })
        res.status(201).json({product});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
});
router.delete('/:id',authenticate,authorise(["seller", "admin"]),async(req,res)=>{
    try {
        const product=await Product.findByIdAndDelete(req.params.id);
        res.status(201).json({product});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
});

router.get('/',async(req,res)=>{
    try {
        const product=await Product.find().lean().exec();
        res.status(201).json({product});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
});

module.exports=router;