var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var app = express();

// view engine setup
app.engine('hbs', exphbs({
  extname:'hbs',
  helpers: {
    select: function(selected, options) {
      return options.fn(this).replace(
        new RegExp(' value=\"' + selected + '\"'),
        '$& selected="selected"');
    }
  }
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  var gender = {};
  gender[req.query.gender] = true;
  res.render('example2', {
    formUsername: req.query.username,
    formPassword: req.query.password,
    formName: req.query.name,
    genderObj: gender,
    formState: req.query.state
  });


});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
