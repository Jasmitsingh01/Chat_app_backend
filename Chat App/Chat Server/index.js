 const express = require("express");
 const app=express();
 const cors = require('cors');
const Routes=require('./Routes/Routes');
const http=require('http');
const  Socket  = require("socket.io");
const User = require("./Models/User");


 require('dotenv').config();
require('../Chat Server/DATABASE CONNECTION/DATACONNECTION')
app.use(cors({
    origin:"*",
}));

const array=[]
const Server=http.createServer(app);
const io=Socket(Server);
io.on('connection',(socket)=>{
   socket.on('joined',({user})=>{
      array[socket.id]=user.name
      socket.emit('welcome',{ user:'info',message:`${array[socket.id]} welcome To the chat`});
      socket.broadcast.emit("UserJoined",{user:'info', message:`New User ${array[socket.id]} join the Chat`});
      socket.on('message',({Mesaage,id})=>{
        io.emit('SendMsg',{user:array[id],message:Mesaage,id});
      })

  })
socket.on('disconnect',()=>{
  socket.broadcast.emit("Userleft",{ user:'info',message:`User ${array[socket.id]} left the Chat`});
})

   
    
}) 

 app.use(express.json());
 app.use(Routes);
 app.get("/", (req, res) => {
   res.send('Chat Server')
 });
 const port = process.env.PORT || 5000;
 Server.listen(port, () => console.log(`Server running on port ${port} 🔥`));