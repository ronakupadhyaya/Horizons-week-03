var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

app.engine('hbs',exphbs({extname:'hbs',defaultLayout:'main.hbs'}));
app.set('view engine', 'hbs');
app.get('/:name/:num', function(req,res){
  var arr = [];
  for(var i=0;i<req.params.num;i++) {
    arr.push(req.params.name)
  }
  res.render('myView', {arr: arr})
});

app.listen(3000);
