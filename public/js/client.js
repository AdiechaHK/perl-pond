const socket = io();

// Connection share
// name = prompt("Name please:")
// socket.emit('register', name)

// socket.on('list-user', name => {
//  $("#players").append($("<p>", {text: name}))
// })

// socket.on('unlist-user', name => {
//  $("#players p").each((a,b) => {if($(b).text() == name) $(b).remove()})
// })


function generateUid(n)
{
  let list = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let str = ''
  while(str.length < n)
  {
    str += list.charAt(Math.floor(Math.random() * list.length))
  }
  return str;
}


var app = new Vue({
  el: '#app',
  data: {
    done: false,
    joined: false,
    myname: 'Harikrushna',
    gameId: '',
    playerId: '',
    showing: '',
    perl: '',
    players: [],
    perls: [],
    result: []
  },
  mounted()
  {
    this.gameId = $("body[game]").attr('game')
    this.playerId = generateUid(13)

    // register socket listeners
    socket.on('player-list-update', (list) => this.players = list)
    socket.on('all-done', (perls) => this.result = perls)
  },
  methods: {
    register()
    {
      if(this.gameId.length != 10)  return alert("Sorry, Seems like you are not on the correct page.")
      socket.emit('register', {name: this.myname, id: this.playerId, gid: this.gameId })
      this.joined = true
    },
    toggle(p)
    {
      this.showing = this.showing == p ? '': p
    },
    complete()
    {
      this.done = true
      socket.emit('done', this.perls)
    },
    addPerl(p)
    {
      this.perls.push({
        to: p,
        from: this.playerId,
        text: this.perl
      });
      this.perl = '';
    },
    removePerl(k)
    {
      this.perls.splice(k, 1)
    }
  }
})
