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
  var male ='';
  var female='';
  var other='';
  if (req.query.gender === "male"){
    male = "checked";
  }else if(req.query.gender === 'female'){
    female = 'checked';
  }else{
    other = 'checked';
  }


  res.render('example2', {
    username: req.query.userName,
    pwd: req.query.password,
    name: req.query.name,
    male: male,
    female: female,
    other: other,
    state: req.query.state
  });

  console.log( req.query.userName,req.query.password,
  req.query.name,
  req.query.gender,
  req.query.state)
});
// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
