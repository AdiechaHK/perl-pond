const util = require('./util')

module.exports = function(app)
{
  app.get('/', (req, res) => res.render('index.pug'))

  app.post('/new', (req, res) => {
    res.redirect('/game/' + util.randomStr(10))
  })

  app.get('/game/:key', (req, res) => res.render('game', { key: req.params.key }))

}
