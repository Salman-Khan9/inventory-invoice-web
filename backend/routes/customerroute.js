const express = require ("express");
const { register,login,logout,profile, logged, update, changepass, forgotpass, resetpass, productroute } = require("../controls/controllers");
const protect = require("../middlewares/auth");


const router = express.Router()
router.post('/signin', register )
router.post("/login",login)
router.get("/logout",logout)
router.get("/profile",protect,profile)
router.get("/logged",logged)
router.patch("/update",protect,update)
router.patch("/changepass",protect,changepass)
router.post("/forgotpass",forgotpass)
router.put("/resetpass/:resettoken",resetpass)


module.exports  = router