const mongoose = require ("mongoose")
const tokenshema = new mongoose.Schema({
userid :{
    type : mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"user"
},
token : {
type:String,
required : true,

},
createdat :{
type:Date,
required:true,
},
expiresat :{
type:Date,
required:true,
}
})
const Token = mongoose.model("Token",tokenshema)
module.exports = Token