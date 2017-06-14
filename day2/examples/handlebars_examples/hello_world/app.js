var express = require('express');
var app = express();

var handlebars = require('express-handlebars');
app.engine('hbs', handlebars({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

//:error
app.get('/:error', function(req, res){
  var name = req.params.error;
  res.render('hbsFile', {
    errorName : name
  })
})

// app.get('/', function(req, res){
//   res.render('hbsFile', {
//     // nothing
//   })
// })

app.listen(3000);
console.log('started');
