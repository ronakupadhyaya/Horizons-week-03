var path = require('path');
var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('hbs', exphbs({
  'extname':'hbs'}));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
    res.render('index.hbs');
});
app.listen(3000);

//FROM MOOSE'S EXERCISE (VIEWS/LAYOUT FILES)
//THIS IS THE TEMPLATE GRABBER, AND IT APPLIES TO THE GET FUNCTIONS
// app.engine('hbs', exphbs({
//   'extname': 'hbs',
//   'defaultLayout': 'main'
// }));
// app.set('view engine','hbs');
//
// // THIS PULLS UP THE ACTUAL PAGE FOR localhost:3000/
// app.get('/', function(req,res){
//   res.render('index.hbs');
// });
//
// // THIS PULLS UP THE ACTUAL PAGE FOR localhost:3000/other
// app.get('/other', function(req,res){
//   res.render('other.hbs');
// })
// app.listen(3000);
