const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    seller:{required:true,type:mongoose.Schema.Types.ObjectId,ref:"User"}
},{
    versionKey:false
})
const Product=mongoose.model("Product",productSchema);
module.exports=Product;