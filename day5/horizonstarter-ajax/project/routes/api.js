var express=require("express");
var Project=require('../module/project');
var router= express.Router();

//router: expresses getting requests and who needs to handle them
// : ~ find value of some parameter
router.post('/api/project/:id/contribute', function(req,res){
	// req.params.id --> can have any number of these for params
	Project.findByIdAndUpdate(req.params.id, update, function(error, project){
		if(error){
			res.status(400).json(error)
			//us json because of ajax, render error otherwise
			//status and json, sstatus and send in conjucntion
			//json and rend are replacements for each other!
			//^^^ this will render html.... 
			//.render: find html template with given name and render with 
			//this data


			//if successful: success.json(project)
		}
		else{
			res.json(project)
			//update object: some mongo update operators operate on arrays
			//can instert other thing inside the project
		}
	});
});

///location is a property only available in the browser
//location.reload() --> ajax: 2 places running js (Server and browser)
//take action on the browser without the server (but work in conjunction)
//given id: can read value and get it back
//in ajax: to get something by id use #
//can parse strings into numbers through parseInt.text()
//parse as a number to do math because strings connect instead of add 
//on top of each other
//after change contribution amomount/number need to go back and update it
//.text(variable) to save back
//need top update percentage raised in addition to just amount contributed
//get value of goal just like raised... to get value: parseInt((#id).text())
//Math.round to get rid of decimal (rounds to nearest integer)
//change progress bar width: ""+progress+"%"!!!!!PROGRESS BAR CONTROLLED BY WIDTH/STYLE
//not calling api, calling json

var outerDiv=$('<div class="well>');
outerDiv.append($('<h4>').text(
	contrib.name+ ' contributed $'+contrib.amount))
if(contrib.comment){
	outerDiv($('<p>').text(contrib.comment))
}
$('#contributions').append(outerDiv)
module.exports=router;