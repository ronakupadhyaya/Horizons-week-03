var express = require('express');
var app = express();
var handlebars = require('express-handlebars');

app.engine('hbs', handlebars({ //takes a configuration object. tells express when trying to render a file, it should use
  extname: '.hbs'
}));
//takes a configuration object. tells express when trying to render a file, it should use
//handlebars library
//basically sets the main library to use

app.set('view engine', 'hbs')
//sets default view engine to hbs

app.get('/', function(req, res) {
  res.render('hw');
});

app.get('/:error', function(req,res){
  res.send(req.params.error + " page not found, did you enter the correct url?");
})

app.listen(3000);
