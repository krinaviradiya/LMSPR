const express = require("express")
const EmpCtl = require("../Controller/EmployeCtl")
const route = express.Router()
const ManagerAuth = require("../Middlewear/ManagerAuth")
const EmployeAuth = require("../Middlewear/EmployeAuth")

route.post("/EmployeLogin",EmpCtl.EmployeLogin)
route.get("/ViewEmploye",EmployeAuth,EmpCtl.ViewEmploye)
route.put("/ChangeEmployePassword",EmployeAuth,EmpCtl.ChangeEmployePassword)
route.post("/ForgotEmployePassword",EmpCtl.forgotEmployePassword)


module.exports = route