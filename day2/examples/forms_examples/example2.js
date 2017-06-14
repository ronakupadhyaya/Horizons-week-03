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
  var male = false;
  var female = false;
  var other = false;

  if(req.query.gender === 'male'){
    male = true;
  }
  else if(req.query.gender === 'female'){
    female = true;
  }
  else{
    other = true;
  }

  res.render('example2',
  {username: req.query.username,
  password: req.query.password,
  name: req.query.name,
  male: male,
  female: female,
  other: other



  }


);
});

// start the express app
var port = process.env.PORT || 9000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
