var mongoose = require('mongoose');

var ContributionSchema = new Mongoose.schema({
	name: String,
	comment: String,
	amount: Number,
});

var Contribution = mongoose.model('mycontributions', ContributionSchema);

var firstCont = new Contribution({name: "Alex", comment: "Yay!", amount: 1000000})

