var express = require('./hello_world/node_modules/express');
var app = express();

var handlebars = require('./hello_world/node_modules/express-handlebars');
app.engine('hbs', handlebars({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.get('/', function(req, res){
  res.render('myHello');
});

app.get('/:error', function(req, res){
  res.send(req.params.error + ` page not found, did you enter the correct url?`);
});

app.listen(3000);
console.log(`Let's go!`);
