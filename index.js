const express = require("express");
const port = 2233;

const app = express();
const db=require("./config/db");

app.use(express.urlencoded()); 
app.use("/",require("./Routes/AdminRoute"));
app.use("/Manager",require("./Routes/ManagerRoute"));
app.use("/Employe",require("./Routes/EmployeRoute"));

app.listen(port,(err)=>{
    err ? console.log(err): console.log("server started on port "+port);
});