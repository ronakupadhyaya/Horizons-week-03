var express = require('express');
var app = express();
var handlebars = require('express-handlebars');
app.engine('hbs', handlebars({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');    //assigns setting name to value
//view engine is an application setting property
//The default engine extension to use when omitted.
//https://expressjs.com/en/api.html#app.settings.table

app.get('/', function(req, res) {
  res.render('section3');
});

app.get('/:error', function(req, res) {
  res.render('error', {
    param: req.params.error
  });
})
app.listen(3000);
console.log('started');
