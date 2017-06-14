var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser({extended: true}));

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('example3');
});

app.post('/login', function (req, res){
  var email = req.body.email;
  var password = req.body.password;
  var name;
  data.forEach(function(item)){
    if(item.email === email && item.password === password){
      name = item.name;
      break;
    }
  }
  if(name){
    res.render('example3', {
      email: req.body.email,
      username: req.body.username,
      name: name
    });
  } else {
    res.render('example3', {
      email: req.body.email,
      username: req.body.username,
    });
  }

})

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
