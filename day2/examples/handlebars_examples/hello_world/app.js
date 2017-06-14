var express = require('express');
var app = express();
var handlebars = require('express-handlebars');
app.engine('hbs', handlebars({
  extname: '.hbs',

}))
app.set('view engine', 'hbs');

app.get('/', function(request, response){
  var name = request.query.name || "...who are you?";
  response.render('mytemplate')
});
app.get('/:error', function(request, response){
  var error = request.params.error;
  //response.send( request.params.error + " page not found, did you enter the correct url?")
  response.render('error', {
    errorMessage: error,
  })
})
app.listen(3000);
//app.get()
//request.params.error
