const mongoose = require("mongoose");

const EmployeSchema = mongoose.Schema({
    EmployeName:{
        type: String,
        required:true
    },
    EmployeEmail:{
        type: String,
        required:true
    },
    EmployePassword:{
        type: String,
        required:true
    }
});

module.exports=EmployeSchema;