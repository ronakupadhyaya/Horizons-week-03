var express = require('express')
var app = express()

var handlebars = require('express-handlebars')
app.engine('hbs', handlebars({
  extname: '.hbs'
}))
app.set('view engine', 'hbs')

app.get('/:error', function(req, res) {
  res.send(req.params.error+' page not found. Did you enter the correct url?')
})

/*
/:error: Displays the text "<error> page not found, did you enter
the correct url?" where <error> is the text entered as a param
*/
app.get('/', function(req, res) {
  var newName = req.query.name || 'you.'
  res.render('hwTemplate', {
    name: newName
  })
})

app.listen(3000)
console.log('started')
