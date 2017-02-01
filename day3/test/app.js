var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('hbs', exphbs({extname:'hbs', defaultLayout: 'main.hbs'}));
app.set('view engine', 'hbs');

app.get('/', function(req, res){
  // YOUR CODE HERE
  
  console.log(req.params.name)
  res.render('myView', {name: req.params.name, num: req.params.num});
});

// PASS THE name and num to the myView view (see next slide)
app.listen(3000);