const mongoose = require("mongoose");

const DB = process.env.DATABASE

mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewuRLParser:true
}).then(()=>console.log("database connected")).catch((err)=>console.log("err",err))