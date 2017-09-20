var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyparser = require('body-parser');
var app = express();
var account = require('./accounts.json');
// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser({extended: true}));

app.get('/', function(req, res) {
  res.render('example3',{
    username: req.query.userName,
    password: req.query.pwd
  });
});


app.post('/login', function(req, res) {
  var uName = req.body.userName;
  var pwrd = req.body.pwd;
  var exists = false;
  var user ={};
  account.forEach(function(person){
    if(person.email === uName && person.password === pwrd){
      exists = true;
      user = person;
    }
  })
  if(exists){
    res.render('example3',{
      username: user.first_name
    });
  }
});
// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
