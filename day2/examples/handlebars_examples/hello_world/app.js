var express = require('express');
var app = express();

var handlebars = require('express-handlebars');
app.engine('hbs', handlebars({
  extname: '.bhs'
}));
app.set('view engine', 'hbs')

app.get('/', function(req, res) {
  res.render('ex')
})

app.use('/:error', function(req, res) {
  res.send(req.params.error, "page not found, did you enter the correct url?")
})


app.listen(3000)
var a = 10
setInterval(function(){
  console.log("running...", a, " seconds");
  a += 10
}, 10000)
