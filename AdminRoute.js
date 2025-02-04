const express = require("express");
const AdminCtl = require("../Controller/AdminCtl");
const route = express.Router()
const AdminAuth = require("../Middlewear/AdminAuth")

route.get("/",AdminAuth,AdminCtl.ViewAdmin)
route.post("/AdminRegister",AdminCtl.AdminRegister)
route.post("/AdminLogin",AdminCtl.AdminLogin)  
route.put("/ChangePassword",AdminAuth,AdminCtl.ChangePassword)
route.post("/ForgotPassword",AdminCtl.ForgotPassword)
route.post("/RegisterManager",AdminCtl.ManagerRegister)
route.get("/ViewManagerData",AdminAuth,AdminCtl.ViewManagerData)
route.delete("/DeleteManager",AdminCtl.DeleteManager)
route.get("/Employe/ViewAllEmploye",AdminAuth,AdminCtl.ViewAllEmploye)
route.delete("/Employe/DeleteEmploye",AdminCtl.DeleteEmploye)


module.exports = route;