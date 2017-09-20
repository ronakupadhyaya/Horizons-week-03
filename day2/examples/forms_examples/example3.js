var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var fs = require('fs');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser({extended: true}));

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('example3');
});

var users = JSON.parse(fs.readFileSync('./accounts.json'));
console.log(users);
var userNumber = -1;
var valid = false;

app.post('/login', function(req, res) {
  for(var i = 0; i < users.length; i++){
    if(req.body.emailBox === users[i].email && req.body.passwordBox === users[i].password){
      userNumber = i;
      valid = true;
    }
  }

  if(userNumber >= 0){
    res.render('example3', {
      userName: users[userNumber].first_name,
      valid: valid
    });
  } else {
    console.log("Invalid username of password");
  }

})

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
