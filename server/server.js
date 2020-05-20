var app = require('express')();
var express = require('express');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var cors = require("cors");

app.use(cors());

var distDir = __dirname + "../client/build/";
app.use(express.static(distDir));

let onlineUsers = {};

io.on('connection', function(socket){
  console.log('new io connection to server');
  let thisGuy = "";
  const thisGuyID = socket.id;

  socket.on('DM', function(toWhoID, msg){
    console.log('dm received! from: ' + thisGuyID + ' to: ' + toWhoID + ' containing msg: ' + msg);
    io.to(toWhoID).emit('DM received', thisGuy, thisGuyID, msg);
    io.to(thisGuyID).emit('DM received', thisGuy, toWhoID, msg);
  });

  socket.on('whose online add', function(nick){
    thisGuy = nick;
    onlineUsers[thisGuyID] = nick;
    console.log('whose online add triggered with nick:', nick);
    io.emit('update whose online now', onlineUsers);
    io.emit('user connected', nick);
  });

  socket.on('disconnect', function(){
    delete onlineUsers[thisGuyID];
    io.emit('user disconnected', thisGuy);
    io.emit('update whose online now', onlineUsers);
  });
  
  socket.on('chat message', function(msg, nick){
    // console.log('chat msg event fired, chat msg is:', msg, 'from nick:', nick);
    //socket.broadcast.emit('chat message', msg, nick);
    io.emit('chat message', msg, nick);
  });

  socket.on('is typing', function(who) {
    io.emit('somebody is typing', who);
  });

});

http.listen(4000, function(){
  console.log('listening on *:4000');
});
