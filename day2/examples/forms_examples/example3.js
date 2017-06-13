var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser({
  extended: true
}))

var data = require('./accounts');

app.get('/', function(req, res) {
  res.render('example3');
});

app.post('/login', function(req, res) {
  var inputemail = req.body.email;
  var inputpassword = req.body.password;
  var name;// = req.body.first_name;
  var isValid = false;
  data.forEach(function(item){
    if(item.hasOwnProperty("email") && item.email===inputemail && item.hasOwnProperty("password") && item.password===inputpassword){
      isValid = true;
      name = item.first_name;
      // console.log("valid is true");
    }
  })
  res.render('login', {
    email: req.body.email,
    password: req.body.password,
    name : name,//req.body.first_name,
    isValid: isValid
  });
});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
