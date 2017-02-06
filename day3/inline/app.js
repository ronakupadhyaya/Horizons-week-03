var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('hbs', exphbs({extname:'hbs', defaultLayout: 'main.hbs'}));
app.set('view engine', 'hbs');

app.get('/:name/:num', function(res,req){
  var arr = [];
  var name = req.params.name;
  var num = parseInt(req.params.num);
  for(var i =0; i<count; i++){
    arr.push(name);
  }
  res.render('myView',{arr: arr});
}
});
// ADD A ENDPOINT TO LISTEN for HTTP GETs on /:name/:num
// PASS THE name and num to the myView view (see next slide)
app.listen(3000);
