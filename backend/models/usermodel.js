const  mongoose  = require("mongoose");
const  bcrypt  = require("bcryptjs");

const userSchema = new mongoose.Schema({
name : {
    type : String,
    required : [true , "please add a name"]
},
email : {
    type : String,
    required : [true ,"please add your email"],
    unique : true,
    trim : true,
    match : [ /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ , "please enter a valid email"]
},
password : {
    type : String,
    required : [true,"please enter your password"],
    minlength : [6,"your password must contain 6 characters "],
    //maxlength : [23,"your password must be less than 23 characters "]
},
photo:{
    type : String,
    required : [true,"please add a photo"],
    default : "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
},
number :{
    type : Number,
    required :[true,"please enter your phone"],
    default : "+92"
},
bio:{
    type : String,
    maxlength:[250,"bio cannot contains more than 250 characters"],
    default:"bio",
},
}
, {timestamps:true});
userSchema.pre("save" ,async function(next){
    if(!this.isModified("password")){
        return next();
    }
 //hashing password
 const salt = await bcrypt.genSalt(10)
 const hashpass = await bcrypt.hash(this.password,salt)
 this.password = hashpass


});

const user = mongoose.model ("customer" , userSchema)
module.exports =  user
