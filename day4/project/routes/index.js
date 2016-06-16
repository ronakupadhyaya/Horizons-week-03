var express = require('express'); //whoever requires
//is going to get this back
var router = express.Router();
 //getting slash, rendering index, exports router

var models= require('../models/models')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/myURL', function(req,res){
	///taking info from projects within models and using it here
	models.project.find(function(error, mongoProjects){
		res.render('projects',{
			'projects': mongoProjects //projects back from mongo
		}); //^^handle projects
		//want to list projects
	})
})

router.get('/hello', function(req, res){
	res.send('Hello there')
})
module.exports = router; //if you have 2 scripts, allows for
//one string to be required by the other (can get one thing
//out of the other)

//node: have to explicitly export things to be used....
//can do so with module.export, can require/return
//set values in other windows

//require: runs all the code and returns whatever module.export
//is set to in another part

// require only returns single value... but can set module.export
//as an object with items in keys to return multiple values
//if multiple: require(file.key) to return element of key
