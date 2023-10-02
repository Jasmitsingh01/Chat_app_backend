const mongoose  = require("mongoose");

const User = new mongoose.Schema({
    Eamil:String,
    Password:String,
    contact_No:String
});
module.exports= mongoose.model('users', User)