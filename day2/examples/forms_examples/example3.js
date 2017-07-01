var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var app = express();
var bodyParser = require('body-parser')
var data = require('./accounts.json')

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser({extended: true}));

app.get('/', function(req, res) {
  res.render('example3');
});

app.post('/', function(req, res) {
    var verified = false;
    var name;
    data.forEach( function(person) {
        if(req.body.email === person.email && req.body.password === person.password) {
            name = person.first_name;
            verified = true;
        }
    })
    res.render('example3', {
        email: req.body.email,
        pass: req.body.password,
        firstName: name,
        verified: verified
    })
});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
