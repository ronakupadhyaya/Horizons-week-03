var mongoose = require('mongoose');
// getting from same directy = ./
var connect = require('./connect');

mongoose.connect(connect);

module.exports = {
    project: mongoose.model('project', {
        title: {
            type: String,
            required: true
        }
    })
}
