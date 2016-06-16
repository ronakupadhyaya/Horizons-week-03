var mongoose = require('mongoose');
var connect = require('./connect');
console.log(connect);
mongoose.connect(connect);

module.exports={
	project: mongoose.model('project', {
		title:{
			type:String,
			required: true
		}
	})
}