/*******************************************
models.js defines the models for MongoDB
collections and documents
********************************************/
"use strict"

var mongoose = require('mongoose');

//model vs. schema
//SCHEMA is an outline for every document
//MODEL allows you to create new documents and save them to ur DB
//a model uses a schema implicitly

//User model for users collection
var User = mongoose.model('User', {
  fname: String,
  lname: String,
  email: String,
  password: String
});

//Post model for posts collection
var Post = mongoose.model('Post', {
  poster: Object,
  content: String,
  likes: Array,
  comments: Array,
  createdAt: Date
});

//Token model for tokens collection
var Token = mongoose.model('Token', {
  userId: String,
  token: String,
  createdAt: Date
});

//allows us to access the models
module.exports = {
  User: User,
  Post: Post,
  Token: Token
}
