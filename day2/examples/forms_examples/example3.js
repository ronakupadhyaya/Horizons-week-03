var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var app = express();

// view engine setup
var data = require('./accounts');
var parser = require("body-parser");
app.use(parser({extended: true}));
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('example3');
  console.log("ok");
});

app.post('/login', function(req, res){
  var email = req.query.email;
  var password = req.query.password;
  console.log("happened");
  data.forEach(function(a){
    if(a.email === email){
      if(a.password === password){
        res.render('example3', {name: a.first_name});
      }
      else{
        res.render('example3',{error: "ok"});
      }
    }else{
      res.render('example3', {error: "ok"});
    }
  });
});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
