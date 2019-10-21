const express = require('express')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000

app.use(express.static('public'))
app.set('views', './views')
app.set('view engine', 'pug')


app.get('/', (req, res) => res.render('index.pug'));

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});