const Prodcut = require("../models/productmodel")
const { formatFileSize } = require("../utils/fileUpload")
const cloudinary = require ("cloudinary").v2;
const productroute = async(req,res)=>{
   const {name,sku,description,quantity,category ,price}= req.body
   //validate
   if(!name||!description||!quantity||!price||!category){
    res.status(400).json("please fill the fields")
   }
   //uploading image with multer
   let filedata = {};
if(req.file){
   let fileuploaded 
   try {
      fileuploaded = await cloudinary.uploader.upload(req.file.path,{folder:"Inventoryapp",resource_type : "image"})
   } catch (error) {
      res.status(400).json("image not uploaded")
   }
   filedata = {
      filename : req.file.originalname, 
      filepath : fileuploaded.secure_url, 
      filesize : formatFileSize(req.file.size), 
      filetype : req.file.mimetype, 
   }
}

   
   //creating product 
   const product = await Prodcut.create({
    User:req.user.id,
    name,sku,description,price,quantity,category,image:filedata
   })
   
   if(product){
    res.status(200).json(product)
   }
  }
  const products = async (req,res)=>{
   try {
      const product = await Prodcut.find({User:req.user.id})
      res.status(200).json(product)
   } catch (error) {
      res.status(400).json("no product found")
   }
  }
  const singleproduct = async(req,res)=>{
   try {
   
      const product = await Prodcut.findById(req.params.id)
      if(!product){
         res.status(400).json("no product found")
      }
      if(product.User.toString()!==req.user.id){
         res.status(400).json("no user")

      }
      res.status(200).json(product)

   } catch (error) {
      res.status(400).json("error")
   }
  }
  const deleteroute = async (req,res)=>{
   
   try {
      const product = await Prodcut.findById(req.params.id)
      if(!product){
         res.status(400).json("no product found")
      }
      if(product.User.toString()!==req.user.id){
         res.status(400).json("product id dont match")
      }
      if(product && product.User.toString()===req.user.id){
           const del = await Prodcut.deleteOne(product)
      }
      res.status(200).json("product deleted")
   } catch (error) {
      console.log(error)
   }
  }
  const update = async (req,res) =>{
   try {
      const {name,description,quantity,category ,price}=req.body
   const id = req.params.id

   const product = await Prodcut.findById(id)
   if(!product){
      res.status(400).json("no product found")
   }
   if(product.User.toString()!==req.user.id){
      res.status(400).json("product id does not match")
   }
   let filedata = {}
   if(req.file){
      let fileuploaded;
      try {
         fileuploaded = await cloudinary.uploader.upload(req.file.path,{folder:"Inventoryapp" , resource_type:"image"})
          }
       catch (error) {
         res.status(400).json({message:error})
      }
      filedata = {
         filename : req.file.originalname, 
         filepath : fileuploaded.secure_url, 
         filesize : formatFileSize(req.file.size), 
         filetype : req.file.mimetype, 
      }
   }
   const update = await Prodcut.findByIdAndUpdate({_id:id},{
      name,description,price,quantity,category, image: Object.keys(filedata).length === 0?product?.image:filedata
      
   },{
      new:true,
      runValidators:true
   })
  res.status(200).json(update)
   } catch (error) {
      res.status(400).json("problem occured while updating")
   }
  }
  const contact = async (req,res) =>{
   
  }
  module.exports = {productroute,products,singleproduct,deleteroute,update,contact}