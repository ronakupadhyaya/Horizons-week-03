var mongoose   = require('./app/mongoose');
var Schema       = mongoose.Schema;

// project schema 
var ProjectSchema   = new Schema({
	title: { type: String, required: true},
	description: { type: String, required: true},
	goal: { type: Number, required:true},
	start: { type: Date, required:true},
	end: { type: Date, required:true}
});

module.exports = mongoose.db.model('Project', ProjectSchema);