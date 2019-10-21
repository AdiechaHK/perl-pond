const socket = io();

// Connection share
name = prompt("Name please:")
socket.emit('register', name)

socket.on('list-user', name => {
	$("#players").append($("<p>", {text: name}))
})

