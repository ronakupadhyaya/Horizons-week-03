var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

app.engine('hbs', exphbs({
	extname: 'hbs',
	defaultLayout: 'main.hbs'
}));
app.set('view engine', 'hbs');






// ADD A ENDPOINT TO LISTEN for HTTP GETs on /:name/:num
// PASS THE name and num to the myView view (see next slide)

app.get('/:name/:num', function(req, res) {
	// YOUR CODE HERE
	// console.log(req.params.name, req.params.num);
	// exphbs.registerPartial('myView', '{{name}}');
	res.render('myView', {
		name: req.params.name,
		num: req.params.num
	});
	// console.log(hbs);

});

app.listen(3000);