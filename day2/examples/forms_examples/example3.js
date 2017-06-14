var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');


var app = express();

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
//var accounts =
var accounts = require('./accounts');
//console.log(accounts)
var bodyParser = require('body-parser');
app.use(bodyParser({extended: true}));

app.get('/', function(req, res) {
  res.render('example3');
});
var validLogin = false;
app.post('/login', function(req, res){
  //if username and password match username and password in accounts, display

  var validUser = {};
//console.log(req.body)
accounts.forEach(function(personObj){
  //parsedAccounts = JSON.parse(personObj);
  //console.log(parsedAccounts)
if(personObj.email === req.body.userEmail && personObj.password === req.body.userPassword){
  console.log(personObj.email, req.body.userEmail)
  console.log(personObj.password, req.body.userPassword)
  validLogin = true
  validUser = personObj;
  console.log(validLogin);
  console.log(validUser)
  }

});
console.log(validUser);
console.log(validLogin);
res.render('example3', {
  userEmail: req.body.userEmail,
  userPassword: req.body.userPassword,
  userName: validUser.first_name,
  error: "Invalid Username or password!",
  valid: validLogin,
})

})
// app.post('/', function (req, res){
// res.render('example3');
// })

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
