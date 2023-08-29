const jwt = require("jsonwebtoken")

const user = require("../models/usermodel")
const protect = async (req,res,next)=>{
    try {
        const token = req.cookies.token
        if(!token){
            res.status(401).json("not authorized ,please login")
        }
            const verify = await jwt.verify(token,process.env.SECRET_KEY)
        const userinfo = await user.findById(verify.id).select("-password")
        if(!userinfo){
            res.status(400).json("user not found")
        }        
        req.user = userinfo
        next();
    } catch (error) {
        console.log(error)
    }
}

module.exports= protect