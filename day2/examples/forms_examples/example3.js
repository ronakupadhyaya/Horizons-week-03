var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var data = require ('./accounts')
var app = express();

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

var bodyParser = require('body-parser');
app.use(bodyParser({extended: true}))

app.get('/', function(req, res) {
  res.render('example3');
});

app.post('/login', function(req, res) {
  var bool = false;
  var name;
  data.forEach(function(item){
    if(item.email === req.body.email && item.password === req.body.password){
      bool = true;
      name = item.first_name;
    }
  })
  if(bool){
    res.send("<h1>Hi " + name)}
    else{
        res.send("<h1 style='color: red;'> Incorrect Password </h1>")
    }
});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
