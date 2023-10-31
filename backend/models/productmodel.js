const mongoose = require("mongoose")
const productschema = new mongoose.Schema({
   User :{
    type :  mongoose.Schema.Types.ObjectId,
    required :true,
    ref : "user"
  },
  name : {
  type : String,
    required : [true,"please enter the name"]

  },
  sku:{
type:String,
required : true,
default : "SKU",
trim:true,
  },
  quantity :{
    type : Number,
    required : [true,"please add the quantity"]
  },
  price : {
    type : String,
    required : [true,"please add a price"]
  },
  image :{
    type : Object,
    default : {}
  } ,description : {
    type : String,
    required : [true,"please add a description"]
  },
  model:{
    type : String,
    required : [true,"please add a model"]
  },
  ordernumber:{
    type : String,
    required : [true,"please add a category"]
  },
  INnumber:{
    type : String,
    required : [true,"please add a category"]
  },
  ICnumber:{
    type : String,
    required : [true,"please add a category"]
  }

})
const Prodcut = mongoose.model ("Products",productschema)
module.exports = Prodcut