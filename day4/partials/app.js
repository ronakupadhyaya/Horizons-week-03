var path = require('path');
var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('hbs', exphbs({
	extname:'hbs'}));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
    res.render('index.hbs');
});



// view = index, comes form views folder
// controller = app.get here 
// model is Cat  

// app.get => when you get this method in the browser, 
// handles by rendering the index.hbs 

// {{#unless cats}}
// 	no cats yet, sorry! 
// 	{{/unless}}
// {{#each cats}}
	// {{/each}}









	app.listen(3000);