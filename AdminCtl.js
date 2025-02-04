const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const mailer = require("../Middlewear/Mailer");
const AdminSchema = require("../model/AdminSchema")
const ManagerSchema = require("../model/ManagerSchema")
const EmployeSchema = require("../model/EmployeSchema")

module.exports.ViewAdmin=async(req,res)=>{
    await AdminSchema.find({}).then((data)=>{
        res.status(200).json({Data:data})
    })
}
module.exports.AdminRegister=async(req,res)=>{
    let user = await AdminSchema.findOne({email:req.body.AdminEmail})
    if(user){
        res.status(200).json({msg:"user alredy exist"})
    }
    req.body.AdminPassword = await bcrypt.hash(req.body.AdminPassword,10)
    await AdminSchema.create(req.body).then((data)=>{
        res.status(200).json({msg:"Admin Added"})
    })
}


module.exports.AdminLogin=async(req,res)=>{
    let user = await AdminSchema.findOne({email:req.body.AdminEmail})
    if (user) {
       if (await bcrypt.compare(req.body.AdminPassword,user.password)) {
        let token = jwt.sign({userdata:user},"LMS",{expiresIn:"1h"});
        token && res.status(200).json({msg:"Login Sucsessful",token:token})
       }else{
        res.status(400).json({msg:"password is wrong"})
       }
    }else{
        res.status(400).json({msg:"user not found"})
    }
}
module.exports.ChangePassword=async(req,res)=>{
    
    if (await bcrypt.compare(req.body.oldPassword,req.user.userdata.AdminPassword)) {
        if (req.body.newPassword == req.body.confirmPassword) {
            let newPass = await bcrypt.hash(req.body.newPassword, 10)
             await AdminSchema.findByIdAndUpdate(req.user.userdata._id, { password: newPass })
            res.status(200).json({ msg: "Password Change Succ" })
        }else{
            res.status(400).json({ msg: "New password and confirm password must be same" })
        }
    }else{
        res.status(400).json({ msg: "Password is wrong" })
    }
}

module.exports.ForgotPassword = async (req, res) => {
    let data = await AdminSchema.findOne({ email: req.body.AdminEmail })
    if (!data) {
        res.status(400).json({ msg: "email is wrong" })
    }
    let otp = Math.floor(Math.random() * 100000 + 900000);
    mailer.sendOtp(req.body.AdminEmail, otp);
    res.cookie("otp", otp);
    res.status(200).json({ msg: "OTP sent successfully !" });
}

module.exports.ManagerRegister=async(req,res)=>{
    let user = await ManagerSchema.findOne({email:req.body.ManagerEmail})
    if(user){
        res.status(200).json({msg:"user alredy exist"})
    }
    req.body.ManagerPassword = await bcrypt.hash(req.body.ManagerPassword,10)
    await ManagerSchema.create(req.body).then((data)=>{
        res.status(200).json({msg:"Manager Added"})
    })
}
module.exports.ViewManagerData=async(req,res)=>{
   await ManagerSchema.find({}).then((data)=>{
    res.status(200).json({Data:data})
   })
}

module.exports.DeleteManager=async(req,res)=>{
    await ManagerSchema.findByIdAndDelete(req.query.id).then((data)=>{
        res.status(200).json({msg:"Data Deleted"})
    })
}
module.exports.ViewAllEmploye=async(req,res)=>{
    await EmployeSchema.find({}).then((data)=>{
        res.status(200).json({Data:data})
    })
}

module.exports.DeleteEmploye=async(req,res)=>{
    await EmployeSchema.findByIdAndDelete(req.query.id).then((data)=>{
        res.status(200).json({msg:"Employe Removed"})
    })
}




