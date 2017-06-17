var express = require('express')
var router = express.Router()
var models = require('./models/models')
var User = models.User
var Token = models.Token
var Post = models.Post
var _ = require('underscore')
var bcrypt = require('bcryptjs');



router.get('/', function(req, res) {
    res.json({message: 'hello'})
})

router.post('/users/register', function(req, res) {

    var password = req.body.password;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                res.json({failure: err})
            } else {
                var newUser = new User({
                    fname: req.body.fname,
                    lname: req.body.lname,
                    email: req.body.email,
                    password: hash
                })
                newUser.save(function(err, user) {
                    if (err) {
                        res.json({failure: err})
                    } else {
                        res.json({success: true})
                    }
                })
            }
        })
    });

})

router.post('/users/login', function(req, res) {
    var password = req.body.password;
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            res.json({error: "Login failed."})
        } else {
            bcrypt.compare(req.body.password, user.password, function(err, isPassword) {
                if (!isPassword) {
                    res.json({failure: err})
                } else {
                    var newToken = new Token({userId: user._id, token: user.email + new Date(), createdAt: new Date()})
                    newToken.save(function(err) {
                        if (err) {
                            res.json({failure: err})
                        } else {
                            res.json({
                                success: true,
                                response: {
                                    id: newToken.userId,
                                    token: newToken.token
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

router.post('/users/logout', function(req, res) {
    Token.remove({token: req.query.token}, function(err){
        if (err){
            res.json({error: err})
        } else {
            res.json({success: true})
        }
    })
})


router.get('/posts/:page', function(req, res) {
    var pageNum = parseInt(req.params.page);
    var token = req.query.token;

    Token.findOne({token: token}, function(err, token) {
        if (err) {
            res.json({failure: err})
        } else {
            Post.find({}, function postGetter(err, post) {
                if (post.length < 10) {
                    res.json([]);
                } else {
                    res.json({
                        success: true,
                        response: post
                    })
                }
            }).skip(10 * (pageNum - 1)).limit(10)
        }
    })
})

router.get('/posts', function(req, res) {
    var token = req.query.token;

    Token.findOne({token: token}, function(err, token) {
        if (err) {
            res.json({failure: err})
        } else {
            Post.find({}, function postGetter(err, post) {
                if (post.length < 10) {
                    res.json([]);
                } else {
                    res.json({
                        success: true,
                        response: post
                    })
                }
            })
        }
    })
})

router.post('/posts', function(req, res) {
    var token = req.query.token;
    var content = req.body.content;

    Token.findOne({token: token}, function(err, token) {
        if (err) {
            res.json({failure: err})
        } else {
            User.findById(token.userId, function(err, user) {
                if (err) {
                    res.json({failure: "Error2", err})
                } else {
                    var name = user.fname + " " + user.lname;
                    var id = user.id;

                    var newPost = new Post ({
                        poster: {
                            name: name,
                            id: id
                        },
                        content: content,
                        likes: [],
                        comments: [],
                        createdAt: new Date()
                    })
                    newPost.save(function(err) {
                        if (err) {
                            res.json({failure: "Error3", err})
                        } else {
                            res.json({
                                success: true,
                                response: newPost
                            })
                        }
                    })
                }
            })
        }
    })

})

router.get('/posts/comments/:post_id', function(req, res) {
    var token = req.query.token;
    var postId = req.params.post_id;

    Token.findOne({token: token}, function(err, token) {
        if (err) {
            res.json({failure: err})
        } else {
            Post.findById(postId, function(err, post) {
                if (err) {
                    res.json({failure: err})
                } else {
                    res.json({
                        success: true,
                        response: post.comments
                    })
                }
            })
        }
    })
})

router.post('/posts/comments/:post_id', function(req, res) {
    var token = req.query.token;
    var postId = req.params.post_id;
    var content = req.body.content;

    Token.findOne({token: token}, function(err, token) {
        if (err) {
            res.json({failure: err})
        } else {
            Post.findById(postId, function(err, post) {
                if (err) {
                    res.json({failure: err})
                } else {
                    User.findById(token.userId, function(err, user) {
                        var name = user.fname + " " + user.lname;
                        var id = user.id;

                        if (err) {
                            res.json({failure: "Error2", err})
                        } else {
                            post.comments.push({
                                createdAt: new Date(),
                                content: content,
                                poster: {
                                    name: name,
                                    id: id
                                }
                            });
                            post.save(function(err) {
                                if (err) {
                                    res.json({failure: err})
                                } else {
                                    res.json({
                                        success: true,
                                        response: post
                                    })

                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

router.get('/posts/likes/:postid', function(req, res) {
    var token = req.query.token;
    var postId = req.params.postid;

    Token.findOne({token: token}, function(err, token) {
        if (err) {
            res.json({failure: err})
        } else {
            Post.findById(postId, function(err, post) {
                if (err) {
                    res.json({failure: err})
                } else {
                    User.findById(token.userId, function(err, user) {
                        var name = user.fname + " " + user.lname;
                        var id = user.id;
                        if (err) {
                            res.json({failure: "Error2", err})
                        } else {
                            var findIndex = _.findIndex(post.likes, function(obj) {
                                return obj.id === user.id
                            })
                            if (findIndex === -1) {
                                post.likes.push({
                                    id: user.id,
                                    name: name,
                                });
                            } else {
                                post.likes.splice(findIndex, 1)
                            }
                            post.save(function(err) {
                                if (err) {
                                    res.json({failure: err})
                                } else {
                                    res.json({
                                        success: true,
                                        response: post
                                    })

                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

router.put('/posts/:postid', function(req, res) {
    var postId = req.params.postid;
    var token = req.query.token;
    var content = req.body.content

    Token.findOne({token: token}, function(err, token) {
        if (err) {
            res.json({failure: err})
        } else {
            Post.findById(postId, function(err, post) {
                if (err) {
                    res.json({failure: err})
                } else {
                    if (token.userId === post.poster.id) {
                        post.content = content;
                        post.save(function(err) {
                            if (err) {
                                res.json({failure: err})
                            } else {
                                res.json({
                                    success: true,
                                    response: post
                                })
                            }
                        })
                    } else {
                        res.json({failure: "You are not OG poster."})
                    }

                }
            })
        }
    })
})

router.delete('/posts/:postid', function(req, res) {
    var postId = req.params.postid;
    var token = req.query.token;
    var content = req.body.content

    Token.findOne({token: token}, function(err, token) {
        if (err) {
            res.json({failure: err})
        } else {
            Post.findById(postId, function(err, post) {
                if (err) {
                    res.json({failure: err})
                }
            }).remove(function(err) {
                if (err) {
                    res.json({failure: err})
                } else {
                    res.json({success: true})
                }
            })
        }
    })
})

module.exports = router


// [ { _id: 5944306a6679217dc922bcff,
//     fname: 'Ben',
//     lname: 'Isbomb',
//     email: 'ben@isbomb.com',
//     password: 'please',
//     __v: 0 } ]

//
// {
//     "success": true,
//     "response": {
//         "id": "5944306a6679217dc922bcff",
//         "token": "ben@isbomb.comFri Jun 16 2017 13:47:18 GMT-0700 (PDT)"
//     }
// }