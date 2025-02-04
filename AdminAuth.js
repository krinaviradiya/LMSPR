
const jwt = require("jsonwebtoken");
const AdminAuth=(req,res,next)=>{
    let token = req.header("Authorization");
    if (!token) {
        return res.status(400).json({msg:"token no found"})
    }
    let newToken = token.slice(7,token.length)
    let decode = jwt.verify(newToken,"LMS")
    req.user = decode
    next()
}

module.exports = AdminAuth;