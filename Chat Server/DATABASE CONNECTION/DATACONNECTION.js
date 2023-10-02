 const mongoose = require("mongoose");
 const Connnection=mongoose.connect("mongodb+srv://jasmits007:eaX40Uo9vSTVhSFS@cluster0.ibp1rp9.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("connected")
 }).catch((err)=>{
    console.log("failed",err)
 })
 module.exports=Connnection