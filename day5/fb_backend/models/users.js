var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var userSchema=new Schema({
  fname:{
    required:true,
    type:String
  },
  lname:{
    required:true,
    type:String
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    required:true,
    type:String
  },

})

var User=mongoose.model('User', userSchema);

module.exports={User:User}
