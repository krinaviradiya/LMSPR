const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/LMS");

const db = mongoose.connection;

db.once("open",(err)=>{
    err?console.log(err):console.log("mongodb successfully connected");
});
module.exports=db;