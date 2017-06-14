var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var app = express();

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('example3');
});

var bodyParser = require('body-parser');
app.use(bodyParser({extended: true}));

app.post('/', function(req, res){
  var fs = require('fs');
  var data = fs.readFileSync('accounts.json', 'utf8');
  var json = JSON.parse(data);

  var email = req.body.email;
  var password = req.body.password;

  json.forEach(function(user){
    if(user.email===email && user.password===password){
      res.render('example3', {
        name: "Hi " + user.first_name,
        loginFailed: false
      });
      return;
    }
  });

  res.render('example3', {
    name: "Error",
    loginFailed: true
  })
})

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
