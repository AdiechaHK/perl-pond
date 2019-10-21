// Basic constants
const app = require('express')()
const http = require('http').createServer(app)
const port = process.env.PORT || 3000
const io = require('socket.io')(http);

// Custom Saperation
const setup = require('./setup')
const pages = require('./pages')
const socket_setup = require('./socket-setup')

// Setup custom
setup(app)
pages(app)
socket_setup(io)


// Run server
http.listen(port, () => console.log(`Example app listening on port ${port}!`))