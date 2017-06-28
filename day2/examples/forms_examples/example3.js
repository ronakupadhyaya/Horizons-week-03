var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var fs = require('fs');

var JSON_FILE = 'accounts.json'
var data = JSON.parse(fs.readFileSync(JSON_FILE));

var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser({extended: true}))
// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('example3');
});

app.post('/login', function(req, res) {
  newData = data.filter(function(profile) {
    return profile.email === req.body.email && profile.password === req.body.password
  })
  if (newData.length) {
    res.render('example3', {
      email: newData[0].email,
      password: newData[0].password,
      first_name: "Hi " + newData[0].first_name + "!"
    })
  } else {
    res.render('example3', {
      email: req.body.email,
      password: req.body.password,
      isError: true,
      first_name: "Invalid login"
    })

  }
})

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
