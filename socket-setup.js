const util = require('./util')

var data = {}

function collectPlayerList(game)
{
  return data[game]['players']
}

function createGame(game)
{
  if (!data.hasOwnProperty(game)) {
    data[game] = {
      players: {},
      perls: []
    }
  }
}

function addPlayer(game, player)
{
  // Find or create Game
  createGame(game)
  if(!data[game]['players'].hasOwnProperty(player.id))
  {
    data[game]['players'][player.id] = {
      name: player.name,
      status: 'joined'
    }
  }
}

function removePlayer(game, player)
{
  if (data.hasOwnProperty(game))
  {
    if(data[game]['players'].hasOwnProperty(player))
    {
      delete data[game]['players'][player]
    }
  }
}

function updatePlayer(game, player, status)
{
  alldone = true;
  for(pid in data[game]['players'])
  {
    if(pid == player) data[game]['players'][pid]['status'] = status
    alldone = alldone && data[game]['players'][pid]['status'] == 'done'
  }
  return alldone
}

function addPerls(game, list)
{
  data[game]['perls'] = data[game]['perls'].concat(list)
}

function getPerls(game)
{
  return data[game]['perls']
}


module.exports = function(io)
{
  io.on('connection', socket => {

    console.log('a user connected');

    socket.on('register', ({name, id, gid}) => {
      console.log(name + " has been registerd")
      socket.puid = id
      socket.gid = gid
      addPlayer(gid, {id, name});
      plist = collectPlayerList(gid)
      io.emit('player-list-update', plist)
    })

    socket.on('disconnect', () => {
      removePlayer(socket.gid, socket.puid)
      if (socket.puid != null) io.emit('user-disconnected', socket.puid)
    });

    socket.on('done', (list) => {
      addPerls(socket.gid, list)
      let allDone = updatePlayer(socket.gid, socket.puid, 'done')
      console.log(socket.puid + " is done, -- ", alldone)
      plist = collectPlayerList(socket.gid)
      io.emit('player-list-update', plist)

      console.log(data)
      if(alldone)
      {
        perls = getPerls(socket.gid)
        io.emit('all-done', perls)
      }
    })

  });
}