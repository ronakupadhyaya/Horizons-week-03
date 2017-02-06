var mongoose = require('mongoose');

var User = mongoose.model('User', {
	fname: {
		type: String,
		required: true
	},
	lname: {
		type: String,
		required: true
	},	
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	token: {
		type: Object,
	}
});

module.exports = {
	User: User
}