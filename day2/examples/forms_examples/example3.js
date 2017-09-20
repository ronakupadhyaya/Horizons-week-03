var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var data = require('./accounts')

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser({extended:true}));

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('example3');
});

app.post('/login', function(req,res) {
  var firstName = ""
  console.log(req.body.email)
  console.log(req.body.pass)
data.forEach(function(person){
    var email = person.email
    var password = person.password
    if (req.body.email === email && req.body.pass === password){
      firstName = person.first_name  // console.log(firstName)
    } else {
      f
    }
  });
  res.render('example3', {candy: firstName})


})
//Add functionality for your form to POST to /login on submit


// In example3.js create a POST route at /login which uses req.body to check if the entered email/password fields are in accounts.json
//
// Given correct credentials render a h1 tag that says "Hi [insert-first-name-here]!" (example below). NOTE that first name can be found in accounts.json
// Given incorrect credentials render a RED error message on your page


// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
