var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);



app.get('/testroute', (req, res) => {
  res.send('express route functional');
});





let onlineUsers2 = {};

io.on('connection', function(socket){
  console.log('new io connection to server');
  let thisGuy = "";
  const thisGuyID = socket.id;

  socket.on('DM', function(toWhoID, msg){
    // console.log('dm received! from: ' + thisGuyID + ' to: ' + toWhoID + ' containing msg: ' + msg);
    io.to(toWhoID).emit('DM received', thisGuy, thisGuyID, msg);
  });

  socket.on('whose online add', function(nick){
    thisGuy = nick;
    onlineUsers2[thisGuyID] = nick;
    io.emit('draw whose online now', onlineUsers2);
    io.emit('user connected', nick);
  });

  socket.on('disconnect', function(){
    delete onlineUsers2[thisGuyID];
    io.emit('user disconnected', thisGuy);
    io.emit('draw whose online now', onlineUsers2);
  });
  
  socket.on('chat message', function(msg, nick){
    socket.broadcast.emit('chat message', msg, nick);
  });

  socket.on('is typing', function(who) {
    io.emit('somebody is typing', who);
  });

});

http.listen(4000, function(){
  console.log('listening on *:4000');
});
