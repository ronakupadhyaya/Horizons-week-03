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
  res.render('example2', {
    usernameValue: req.query.username,
    passwordValue: req.query.password,
    nameValue: req.query.name,
    gender: req.query.gender
  });
});

app.get('/identical', function(req, res){
  var maleChecked = ""; var femaleChecked = ""; var otherChecked = "";
  if (req.query.gender === "male"){
    maleChecked = "checked";
  } else if (req.query.gender === "female"){
    femaleChecked = "checked";
  } else {
    otherChecked = "checked";
  }
  res.render('example2', {
    usernameValue : req.query.username,
    passwordValue: req.query.password,
    nameValue: req.query.name,
    maleChecked: maleChecked,
    femaleChecked: femaleChecked,
    otherChecked: otherChecked
  })
})

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
