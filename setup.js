const express = require('express')

module.exports = function(app)
{
  app.use(express.static('public'))
  app.set('views', './views')
  app.set('view engine', 'pug')
}