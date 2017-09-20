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
    username: req.query.username,
    password: req.query.password,
    name: req.query.name,
    gender: req.query.gender,
    isMale: req.query.gender === 'male',
    isFemale: req.query.gender === 'female',
    isOther: req.query.gender === 'other',
    isMN: req.query.state === 'MN',
    isCA: req.query.state === 'CA',
    isWA: req.query.state === 'WA'
  });
});


// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
