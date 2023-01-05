const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

const port = process.env.PORT || 3000;
io.on('connection', (socket) => {
  socket.join('some room')
  console.log('a user connected' );


  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
    // io.sockets.in('room').emit('event_name', data)
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
    var id = socket.io.engine.id;
  alert(id);
  });

});

httpServer.listen(port, () => console.log(`listening on port ${port}`));
