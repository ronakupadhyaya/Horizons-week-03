var express = require('express');
var router = express.Router();
var models = require('./models/models');
var User = models.User;
var Token = models.Token;
var Post = models.Post;

router.get('/', function(req, res) {
    res.json({
        message: 'hello'
    })
});

router.post('/users/register', function(req, res) {
    var newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password
    })
    newUser.save(function(err, usr) {
        if (err) {
            res.json({
                failure: 'database error'
            })
        } else {
            res.json({
                success: true
            })
        }
    });
    //can't send success response here! because asynchronous!!!
})

router.post('/users/login', function (req, res) {
    User.find({
        email: req.body.email,
        password: req.body.password
    }, function (err, users) {
        if (users) {
            var newToken = new Token({
                userId: users[0]._id,
                token: req.body.email + (new Date()).getTime().toString(),
                createdAt: new Date()
            })
            newToken.save(function(err, token) {
                if (err) {
                    res.json({
                        failure: "token error"
                    })
                } else {
                    res.json({
                        success: true,
                        response: {
                            id: newToken.userId,
                            token: newToken.token
                        }
                    })
                }
            });
        }
    })
})

router.get('/users/logout', function (req, res) {
    Token.findOneAndRemove({ token: req.query.token }, function (err) {
        if (err) {
            res.json({
                failure: "token error"
            });
        } else {
            res.json({
                success: true
            });
        }
    })
})

router.get('/posts/:page', function(req, res) {
    Token.findOne({token: req.query.token}, function(err, token) {
        User.findOne({_id: token.userId}, function(err, user) {
            if (err) {
                res.json({
                    failure: "user error"
                })
            } else {
                Post.findAll(function(err, posts) {
                    var postArray = [];
                    for(var i = req.params.page * 10 - 10; i < req.params.page * 10; i++) {
                        postArray.push(posts[i]);
                    }
                    res.json({
                        success: true,
                        response: postArray
                    })
                })
            }
        })
    })
})

router.get('/posts', function(req, res) {
    Token.findOne({token: req.query.token}, function(err, token) {
        User.findOne({_id: token.userId}, function(err, user) {
            if (err) {
                res.json({
                    failure: "user error"
                })
            } else {
                Post.findAll(function(err, posts) {
                    var postArray = [];
                    for(var i = 0; i < 10 * 10; i++) {
                        postArray.push(posts[i]);
                    }
                    res.json({
                        success: true,
                        response: postArray
                    })
                })
            }
        })
    })
})

router.post('/posts/', function(req, res) {
    
})

module.exports = router;