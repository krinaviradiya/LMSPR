const AdminSchema = require("../model/AdminSchema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const mailer = require("../Middlewear/Mailer")
const ManagerSchema = require("../model/ManagerSchema")
const EmployeSchema = require("../model/EmployeSchema")

module.exports.ManagerLogin=async(req,res)=>{
    let user = await ManagerSchema.findOne({email:req.body.ManagerEmail})
    if (user) {
       if (await bcrypt.compare(req.body.ManagerPassword,user.password)) {
        let token = jwt.sign({userdata:user},"def",{expiresIn:"1h"});
        token && res.status(200).json({msg:"Login Sucsessful",token:token})
       }else{
        res.status(400).json({msg:"password is wrong"})
       }
    }else{
        res.status(400).json({msg:"user not found"})
    }
}
module.exports.ManagerData=async(req,res)=>{
    await ManagerSchema.find({}).then((data)=>{
        res.status(200).json({Details:data})
    })
}
module.exports.ChangeManagerPassword=async(req,res)=>{
    
    if (await bcrypt.compare(req.body.oldPassword,req.user.userdata.password)) {
        if (req.body.newPassword == req.body.confirmPassword) {
            let newPass = await bcrypt.hash(req.body.newPassword, 10)
             await ManagerSchema.findByIdAndUpdate(req.user.userdata._id, { password: newPass })
            res.status(200).json({ msg: "Password Change Succ" })
        }else{
            res.status(400).json({ msg: "New password and confirm password must be same" })
        }
    }else{
        res.status(400).json({ msg: "Password is wrong" })
    }
}

module.exports.forgotManagerPassword = async (req, res) => {
    let data = await ManagerSchema.findOne({ email: req.body.ManagerEmail })
    if (!data) {
        res.status(400).json({ msg: "email is wrong" })
    }
    let otp = Math.floor(Math.random() * 100000 + 900000);
    mailer.sendOtp(req.body.ManagerEmail, otp);
    res.cookie("otp", otp);
    res.status(200).json({ msg: "OTP sent successfully !" });
}
module.exports.RegisterEmploye=async(req,res)=>{
    let user = await EmployeSchema.findOne({email:req.body.EmployeEmail})
    if (user) {
    res.status(200).json({msg:"Employe Alredy Exist"})
    }
    req.body.EmployePassword = await bcrypt.hash(req.body.EmployePassword,10)
    await EmployeSchema.create(req.body).then((data)=>{
        res.status(200).json({msg:"Employe Added"})
    })
}

module.exports.ViewEmployeData=async(req,res)=>{
    await EmployeSchema.find({}).then((data)=>{
        res.status(200).json({Data:data})
    })
}