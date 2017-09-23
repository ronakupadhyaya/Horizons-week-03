var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  poster:{
    type: Object
  },
  content:{
    type: String
  },
  likes:{
    type: Array
  },
  comments:{
    type: Array
  },
  createdAt: {
    type: Date
  }
});

module.exports =  mongoose.model('Post', PostSchema)
