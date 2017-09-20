var express = require('express');
var app = express();
var handlebars = require('express-handlebars');

app.engine('hbs',handlebars({
  extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>')
});

// app.get('/temp', function(req, res){
//   res.render('myFirstTemplate', {
//     greetingName: req.query.name
//   });
// });

app.get('/:error', function(req, res){
  res.send(req.params.error + " page not found, did you enter the correct url?")
});

app.listen(3000);
