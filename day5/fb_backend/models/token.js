var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var tokenSchema=new Schema({
  userId: String,
  token: String,
  createdAt: Date
})

var Token=mongoose.model('Token', tokenSchema);

module.exports={Token:Token}
