const mongoose = require("mongoose");

const ManagerSchema = mongoose.Schema({
    ManagerName:{
        type: String,
        required:true
    },
    ManagerEmail:{
        type: String,
        required:true
    },
    ManagerPassword:{
        type: String,
        required:true
    }
});

module.exports=ManagerSchema;