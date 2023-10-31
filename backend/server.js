const dotenv =  require ("dotenv").config()
const express = require ("express")
const mongoose = require ("mongoose")
const cors = require ("cors")
const path = require ("path")

const bodyParser = require("body-parser")
const router = require("./routes/customerroute")
const cookieParser = require("cookie-parser")
const prrouter = require("./routes/productroute")
const contactrouter = require("./routes/contactus")
const invoiceroute = require("./routes/invoiceroutes")
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true
}))
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use("/api/user",router)
app.use("/api",invoiceroute)
app.use("/api/contactus",contactrouter)
app.use("/api/product",prrouter)
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
const Port = process.env.Port || 5000
//connect to mongodb
mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(Port,()=>{

        console.log(`server running on ${Port}`)
    })
}).catch((err)=>{console.log(err)})