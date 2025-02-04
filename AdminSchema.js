const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
    AdminName:{
        type: String,
        required:true
    },
    AdminEmail:{
        type: String,
        required:true
    },
    AdminPhone:{
        type: String,
        required:true
    },
    AdminPassword:{
        type: String,
        required:true
    }
});

let Admin=mongoose.model("AdminSchema",AdminSchema);

module.exports=Admin;