module.exports = function(io)
{
  io.on('connection', socket => {

    console.log('a user connected');

    socket.on('register', (name) => {
      console.log(name + " has been registerd")
      io.emit('list-user', name)
    })

    socket.on('disconnect', () => console.log('user disconnected'));

  });
}