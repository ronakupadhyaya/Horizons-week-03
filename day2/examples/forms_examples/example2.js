var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var states = require('./states');
var genders = require('./genders');

var app = express();

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  var temp = JSON.parse(JSON.stringify(states));
  temp.forEach(function(item){
    if(item.name === req.query.state){
      item.selected = true;
    }
  })

  var tempGen = JSON.parse(JSON.stringify(genders));
  tempGen.forEach(function(item){
    if(item.name === req.query.gender){
      item.selected = true;
    }
  })

  res.render('example2', {
    text: req.query.text,
    username: req.query.username,
    password: req.query.password,
    name: req.query.name,
    state: req.query.state,
    gender: req.query.gender,
    stateData: temp,
    gendersData: tempGen
  });
});

// var sel = document.getElementById('stateSelect');
// for(var i = 0; i < states.length; i++) {
//     var opt = document.createElement('option');
//     opt.innerHTML = states[i][0];
//     opt.value = states[i][0];
//     sel.appendChild(opt);
// }

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
