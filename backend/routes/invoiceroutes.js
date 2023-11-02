const express = require("express")
const createinvoice = require("../controls/invoicecontrols")
const protect = require("../middlewares/auth")
const invoiceroute = express.Router()
invoiceroute.post("/createinvoice",protect,createinvoice)
module.exports = invoiceroute