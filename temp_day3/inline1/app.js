var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

app.engine('hbs', exphbs({extname:'hbs', defaultLayout: 'main.hbs'}));
app.set('view engine', 'hbs');

//ADD A ENDPOINT TO LISTEN for HTTP GETs on /:name/:num
//PASS the name and num to the myView view
app.get('/:name/:num', function(req, res){
  var arr = [];
  var name = req.params.name;
  var num = req.params.num;
  for (var i = 0; i < parseInt(num); i++){
    arr.push(name);
  }
  res.render('myView',{arr:arr});
});

app.listen(3000);
