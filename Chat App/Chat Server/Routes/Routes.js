const express = require("express");
const { Singup, Login } = require("../Controllers/User's");
const routes=express.Router();

routes.post('/singup',Singup)
routes.post('/login',Login)

module.exports=routes;