const user = require("../models/usermodel");
const bcrypt = require ("bcryptjs");
const jwt = require("jsonwebtoken");
const Token = require("../models/tokenmodel");
const Crypto = require("crypto");

const sendMail = require("../utils/emailsend");
const generatetoken = (id)=>{
    return jwt.sign({id},process.env.SECRET_KEY,{expiresIn:"1d"});
}
const register = async (req,res) =>{
    
//register user
    try {
        const {name,email,password} = req.body;
        if(!email||!password||!name){
            res.status(400)
            throw new Error ("please enter all required fields")
        }
        const userexist = await user.findOne({email})
        if(userexist){
            res.status(400).json("user already exist")
            throw new Error ("user already exist")
        }
        
      
        //new user 
        const newuser = await user.create({email,password,name})
        //generating token
      const token = generatetoken(newuser._id);
      //sending cookie
     res.cookie("token",token,{
        path:"/",
        httpOnly : true,
        expires : new Date(Date.now()+1000*86400),
        samesite : "none",
        secure : true,
     })
      if(newuser){
       const {_id,email,name,number,bio}  = newuser
        res.status(200).json({_id,email,name,number,bio,token})
      }
      

    } catch (error) {
        console.log(error)
    }
}
const login = async (req,res)=>{
    try {
        //validate
        const {email,password}= req.body
        if(!email){
            res.status(400).json("enter your email")
            throw new Error("enter your email")
           }
             if(!password){
                res.status(400).json("enter your pass")
                throw new Error("enter your password")
               }
    //check user exist
    const userexist = await user.findOne({email})
       
    if(!userexist){
        res.status(400).json("user dosenot exist")
        throw new Error ("email does not exist")
    }
    //check password
    const passcheck= await bcrypt.compare(password , userexist.password)
    if(!passcheck){
        res.status(400).json("password does not match")
        throw new Error ("your password is incorrect")
    }
        //generating token

    const token = generatetoken(userexist._id);
    //sending cookie
    res.cookie("token",token,{
      path:"/",
      httpOnly : true,
      expires : new Date(Date.now()+1000*86400),
      samesite : "none",
      secure : true,
    })
    //if user exist && password is correct then login
    if(userexist&&passcheck){
        const {email,name,bio,number} = userexist
        res.status(200).json({email,name,bio,number,token})
    }else{
        res.status(400).json("invalid email or password")
    }
    
    } catch (error) {
        console.log(error)
    }
    
    }
    //logging out
    const logout = async (req,res) =>{
    try {
        res.cookie("token","",{
            path:"/",
            httpOnly : true,
            expires : new Date(0),
            samesite : "none",
            secure : true,
          })
    return res.status(200).json("loggedout successfully")
    } catch (error) {
        console.log(error)
    }
    }
    //authentication of profile visit
    const profile = async(req,res)=>{
         const data = await user.findById(req.user._id) 
         if(!data){
            res.staus(400).json("no data recieved")
         }
         if(data){
            const {name,email,number,bio} = data
            res.status(200).json(
               { email,bio,number,name}
            )
         }
    }
    //logged in or not
    const logged = async (req,res)=>{
    const token = req.cookies.token
    if(!token){
        return res.json(false)
    }
    const verify = await jwt.verify(token ,process.env.SECRET_KEY)
    if(verify){
        return res.status(200).json(true)
    }
    else{
        return res.status(400).json(false)
    }
    }
    const update = async(req,res)=>{
       try {
        const data = await user.findById(req.user._id)
        if(data){

        const {name ,email ,bio,number ,photo} = data;
       data.email=email;
       data.name=req.body.name || name;
       data.photo=req.body.photo || photo;
       data.bio=req.body.bio || bio ;
       data.number= req.body.number || number;
const updateuser = await data.save()
   res.json({
       _id:updateuser._id,
       name:updateuser.name,
       bio:updateuser.bio,
       number:updateuser.number,
       photo:updateuser.photo,

   })
   }else{
    throw new Error("user not found")
   }
       } catch (error) {
        console.log(error)
       }
     
    }
    //change password
    const changepass=async(req,res)=>{
      try {
        const data = await user.findById(req.user._id)
        const {oldpassword,password}=req.body
        if(!data){
            res.status(400).json("no user found")
        }
        if(!oldpassword || !password){
            res.status(400).json("please enter old password and new password")
        }
        //passmatch or not
        const passcheck = await bcrypt.compare(oldpassword,data.password)
        if(!passcheck){
            res.status(400).json("passowrd incorrect")
        }
        if(data&&passcheck){
            data.password = password
            await data.save()
            res.status(200).json("password changed successfully")
        }else{
            res.status(400).json("something went wrong")
        }

      } catch (error) {
        console.log(error)
      }
    }
    const forgotpass =async (req,res)=>{
        try {
            const {email}= req.body
        const userexist = await user.findOne({email})
        if(!userexist){
            res.status(400).json({message:"Wrong Email"})
        
        }
        //delete token if exist
        const token = await Token.findOne({userid: userexist._id})
        
        if(token){
            await Token.deleteOne()
        }
        //create reset token
        let resettoken =  Crypto.randomBytes(32).toString("hex")+userexist._id
       
        //hashing token
        const hashtoken =  Crypto.createHash("sha256").update(resettoken).digest("hex")
        //saving token to DB
        await new Token({
            userid :userexist._id,
            token:hashtoken,
            createdat: Date.now(),
            expiresat : Date.now() + 30 *(60*1000),
        }).save()
        //construct reset url
        const reseturl = `${process.env.frontend_url}/Resetpass/${resettoken}`
        //reset email
        const message = `
        <h2>Hello ${userexist.name}<h2>
        <p>Please Use the url below to reset your password<p>
        <p>this reset link is valid for 30 mins<p>
        <a href= ${reseturl} clicktracking = off>${reseturl}<a>
        `;
        const subject = "Password Reset Request"
        const send_to = userexist.email
        const sent_from = "fsdsalman12.sk@gmail.com"
        try {
            await sendMail(sent_from,send_to,message,subject)
            res.status(200).json({success:true , message:"Reset Email Sent"})
           } catch (error) {
            res.status(500).json("Email not sent please try again ")
           }
    }
      
     catch (error) {
            console.log({message:"erorr"})
        }
    }
    const resetpass = async(req,res)=>{
        const {password} = req.body
        const {resettoken}= req.params
        //hash token then compare to the token in DB
        const hashtoken = Crypto.createHash("sha256").update(resettoken).digest("hex")
        //findtoken
        const restoken = await Token.findOne ({
        
            token:hashtoken,
            expiresat : {$gt : Date.now()}
        })
        if(!restoken){
            throw new Error("not a valid token")
        }
        //else find user and change pass
        const finduser = await user.findOne({_id :restoken.userid})
        finduser.password = password
        await finduser.save()
        res.status(200).json({message :"password reset successful please logon"})

       
    }
   
    module.exports = {login,logout,register,profile,logged,update,changepass,forgotpass,resetpass}