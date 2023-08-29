const express = require("express")
const contactrouter = express.Router()
const protect = require("../middlewares/auth");
const contactus = require("../controls/contactus");
contactrouter.post("/",protect,contactus)
module.exports = contactrouter
