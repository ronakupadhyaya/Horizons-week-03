var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser({extended: true}));
app.get('/', function(req, res) {
  res.render('example3');
});

app.post('/login', function(req, res){
  console.log(req.body);
    var email = req.body.email;
    var password = req.body.password;
    var readFileJSON = JSON.parse(fs.readFileSync('./accounts.json', 'utf8'));
    var accountExists = false;
    var user={};
    for(var i =0; i <readFileJSON.length; i++){
      if(email === readFileJSON[i].email && password === readFileJSON[i].password){
        user = readFileJSON[i].first_name;
        accountExists = true;
      }
    }

      res.render('example3', {email: email, password: password, accountExists: accountExists, user: user, login: true })


})
// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
