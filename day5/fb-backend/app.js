"use strict";

// Require the necessary modules.
var exphbs  = require('express-handlebars');
var express = require('express');
var validator = require('express-validator');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express()

// Require the models from models.js

var Token = require('./models').Token;
var Post = require('./models').Post;

// Connecting mongoose
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connection', function() {
    console.log("Success! You are connected");
});

// Body parser configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(validator());

// Setting up handlebars
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Register Get Route
app.get('/api/users/register', function(req, res) {
    res.render('register');
});

// Register Post Route
app.post('/api/users/register', function(req, res) {
    // console.log(req.body.fname, req.query.fname);
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var password = req.body.password;
    req.checkBody('fname', 'First name is required.').notEmpty();
    req.checkBody('lname', 'Last name is required.').notEmpty();
    req.checkBody('email', 'Email is not authenticated.').isEmail();
    req.checkBody('password', 'Password is required.').notEmpty();
    var errors = req.validationErrors()
    if (errors) {
        alert('You have errors with your registration fields.')
    }
    else {
        var user = new User({
            fname: fname,
            lname: lname,
            email: email,
            password: password
        })
        user.save(function(err) {
            if (err) {
                res.status(500).json(err);
            }
            else {
                console.log("Success! You successfully registered.")
                res.redirect('/api/posts')
            }
        });

    }
});

// Login Get Route
app.get('/api/users/login', function(req, res) {
    res.render('login');
});

// Login Post Route
app.post('/api/users/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({
        email: email,
        password: password
    }, function (err, user) {
        if (err) {
            console.log("Error. Could not find user.");
        }
        else if (user === null) {
            console.log("Your credentials are wrong!!!");
            res.render('login')
        }
        else {
            var id = user._id;
            var dateNow = Date.now();
            var token = new Token({
                userId: id,
                token: user.email + dateNow,
                createdAt: dateNow
            })
            token.save(function(err) {
                if (err) {
                    res.status(500).json(err);
                }
                else {
                    console.log("Success! You successfully logged in.")
                    res.json({
                        id: id,
                        token: token.token
                    })
                }
            });
        }
    })
});

// Logout Route
app.get('/api/users/logout', function(req, res) {
    Token.remove({token: req.body.token}, function(err) {
        if (err) {
            console.log("Could not logout.");
        }
        else {
            res.redirect('/api/users/register');
        }
    })
});

// Post Get Route
app.get('/api/posts', function(req, res) {
    var token = req.query.token;
    Token.findOne({token: token}, function(err, foundToken){
        if (err || foundToken == null) {
            console.log("Error!");
        }
        else {
            Post.find({}, function(err, posts){
                var postArray = []
                posts.forEach(function(post) {
                    var postId = post._id;
                    var posterId = post.poster.id;
                    var posterName = post.poster.name;
                    var content = post.content;
                    var createdAt = post.createdAt;
                    var comments = post.comments;
                    var likes = post.likes;
                    postArray.push({
                        "_id": postId,
                        "poster": {
                            "id": posterId,
                            "name": posterName
                        },
                        "content": content,
                        "createdAt": createdAt,
                        "comments": comments,
                        "likes": likes
                    })
                })
                res.json(postArray)
            })
        }
    })

});

// Post Post Route
app.post('/api/posts', function(req, res) {
    var token = req.body.token;
    var content = req.body.content;
    Token.findOne({token: token}, function(err, foundToken){
        var userId = foundToken.userId
        var post = new Post({
            poster: {
                id: userId,
                name: foundToken.fname,
            },
            content: content,
            likes: [],
            comments: [],
            createdAt: Date.now()
        })
        post.save(function(err) {
            if (err) {
                res.status(500).json(err);
            }
            else {
                console.log("Success! You posted a post!")
                res.json(post)
            }
        });
    });
});

// Comment Post Route
app.post('/api/comments/:post_id', function(req, res) {
    var token = req.body.token;
    var content = req.body.content;
    var postId = req.params.post_id;
    Post.findOne({_id: postId}, function(err, foundPost){
        if(err) {
            console.log("Error finding post.");
        }
        else {
            Token.findOne({token: token}, function(err, foundToken) {
                var userId = foundToken.userId;
                var commentArray = [];
                commentArray = foundPost.comments
                commentArray.push({
                    createdAt: Date.now(),
                    content: content,
                    poster: {
                        name: foundToken.name,
                        id: userId
                    }
                })
                foundPost.save(function(err) {
                    if (err) {
                        res.status(500).json(err);
                    }
                    else {
                        console.log("Success! You posted a comment!")
                        res.json(foundPost)
                    }
                })
            })
        }
    })
});

// Get Comment Route
app.get('/api/comments/:post_id', function(req, res) {
    var token = req.query.token;
    var postId = req.params.post_id;
    Post.findOne({_id: postId}, function(err, foundPost){
        if(err) {
            console.log("Error finding post.");
        }
        else {
            res.json(foundPost.comments)
        }
    })
})


// Listen in on 3000
app.listen(process.env.PORT || 3000);
