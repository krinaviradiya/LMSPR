const AdminSchema = require("../model/AdminSchema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const mailer = require("../Middlewear/Mailer")
const ManagerSchema = require("../model/ManagerSchema")
const EmployeSchema = require("../model/EmployeSchema")


module.exports.EmployeLogin=async(req,res)=>{
    let user = await EmployeSchema.findOne({email:req.body.EmployeEmail})
    if (user) {
       if (await bcrypt.compare(req.body.EmployePassword,user.password)) {
        let token = jwt.sign({userdata:user},"LMS",{expiresIn:"1h"});
        token && res.status(200).json({msg:"Login Sucsessful",token:token})
       }else{
        res.status(400).json({msg:"password is wrong"})
       }
    }else{
        res.status(400).json({msg:"Employe not found"})
    }
}

module.exports.ViewEmploye=async(req,res)=>{
    await EmployeSchema.find({}).then((data)=>{
        res.status(200).json({Data:data})
    })
}
module.exports.ChangeEmployePassword=async(req,res)=>{
    if (await bcrypt.compare(req.body.oldPassword,req.user.userdata.password)) {
        if (req.body.newPassword == req.body.confirmPassword) {
            let newPass = await bcrypt.hash(req.body.newPassword, 10)
             await EmployeSchema.findByIdAndUpdate(req.user.userdata._id, { password: newPass })
            res.status(200).json({ msg: "Password Change Succ" })
        }else{
            res.status(400).json({ msg: "New password and confirm password must be same" })
        }
    }else{
        res.status(400).json({ msg: "Password is wrong" })
    }
}

module.exports.forgotEmployePassword = async (req, res) => {
    let data = await EmployeSchema.findOne({ email: req.body.EmployeEmail })
    if (!data) {
        res.status(400).json({ msg: "email is wrong" })
    }
    let otp = Math.floor(Math.random() * 100000 + 900000);
    mailer.sendOtp(req.body.email, otp);
    res.cookie("otp", otp);
    res.status(200).json({ msg: "OTP sent successfully !" });
}