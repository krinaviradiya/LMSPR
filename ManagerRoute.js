const express = require("express")
const ManagerCtl = require("../Controller/ManagerCtl")
const route = express.Router()
const ManagerAuth = require("../Middlewear/ManagerAuth")

route.post("/ManagerLogin",ManagerCtl.ManagerLogin)
route.get("/ManagerData",ManagerAuth,ManagerCtl.ManagerData)
route.put("/ChangeManagerPassword",ManagerAuth,ManagerCtl.ChangeManagerPassword)
route.post("/ForgotManagerPassword",ManagerCtl.forgotManagerPassword)
route.post("/EmployeRegister",ManagerAuth,ManagerCtl.RegisterEmploye)
route.get("/ViewEmployeData",ManagerAuth,ManagerCtl.ViewEmployeData)



module.exports = route   