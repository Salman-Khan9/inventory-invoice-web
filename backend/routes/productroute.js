const express = require ("express")

const protect = require("../middlewares/auth")
const {productroute,products, singleproduct, deleteroute, contact, update} = require("../controls/productcontrol")
const { upload } = require("../utils/fileUpload")
const prrouter = express.Router()
 prrouter.post ("/",protect,upload.single("image"),productroute)
 prrouter.get("/allproducts",protect,products)
 prrouter.get("/singleproduct/:id",protect,singleproduct)
 prrouter.delete("/delete/:id",protect,deleteroute)
 prrouter.patch("/update/:id",upload.single("image"),protect,update)
 prrouter.post("/contact",protect,contact)
 module.exports = prrouter

