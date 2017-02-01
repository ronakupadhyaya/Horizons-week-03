var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
app.engine('hbs', exphbs({extname:'hbs', defaultLayout: 'main.hbs'}));
app.set('view engine', 'hbs');

app.get('/:name/:num', function(req,res) {
  var myName = req.params.name
  var myNumber = req.params.num
  var name = [];
  for(var i=0; i<myNumber; i++) {
    name.push(myName)
  }
  res.render('myView', {name: name});
})


app.listen(3000);
