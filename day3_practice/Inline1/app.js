var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('hbs', exphbs({extname:'hbs', defaultLayout: 'main.hbs'}));
app.set('view engine', 'hbs');
// ADD A ENDPOINT TO LISTEN for HTTP GETs on /:name/:num
// PASS THE name and num to the myView view (see next slide)
app.get('/:name/:num',function(req, res){
  var arr = [];
  var name = req.params.name;
  var num = req.params.num;
  console.log(req.params);
  for (var i = 0; i<5; i++){
    arr.push(name);
  }
  res.render('myView', {arr: arr})
})


app.listen(3000);
