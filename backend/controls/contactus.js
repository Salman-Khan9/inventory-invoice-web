const user = require("../models/usermodel");
const sendMail = require("../utils/emailsend");
const contactus = async (req,res)=>{
    const {message ,subject}= req.body
    const User = await user.findById(req.user.id)
if(!User){
    res.status(400).json("please login first")
}
if(!message||!subject){
    res.status(400).json("please fill the required fileds")
}
const   sent_from =process.env.SendingEmailFrom
const   send_to = process.env.senderEmail
 
    
const reply_to = User.email
try {
    await sendMail(sent_from,send_to ,message,subject,reply_to)
    res.status(200).json({success:true , message:"Email Sent"})
   } catch (error) {
    res.status(500).json("Email not sent please try again ")
   }
}
module.exports= contactus