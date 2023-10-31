const express = require("express")
const {createinvoice,invoicehistory} = require("../controls/invoicecontrols")
const protect = require("../middlewares/auth")
const invoiceroute = express.Router()
invoiceroute.post("/createinvoice",protect,createinvoice)
invoiceroute.get("/invoicehistory",protect,invoicehistory)
module.exports = invoiceroute