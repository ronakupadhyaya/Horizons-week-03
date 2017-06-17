var express = require('express');
var router = express.Router();
var models = require('./models/models');
var User = models.User;
var Token = models.Token;
var Post = models.Post;

router.get('/', function (req, res) {
    res.json({ message: 'hello' });
});

router.post('/users/register', function (req, res) {
    var newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
    })
    newUser.save(function (err, usr) {
        if (err) {
            res.json({ failure: 'database error' });
        } else {
            res.json({ success: true });
        }
    })
});

router.post('/users/login', function (req, res) {
    User.findOne({
        email: req.body.email,
        password: req.body.password,
    }, function (err, profile) {
        if (err) {
            res.json({ failure: 'login error' })
        } else {
            var newToken = new Token({
                userId: profile._id,
                token: profile._id + new Date(),
                createdAt: new Date(),
            });
            accessToken = newToken.token;
            newToken.save(function (err, usr) {
                if (err) {
                    console.log("Token creation error");
                } else {
                    console.log("Token Created");
                }
            });
            res.json({
                success: true,
                response: newToken,
            });
        }
    });
});

router.post('/users/logout', function (req, res) {
    Token.remove({
        token: req.headers.token,
    }, function (err) {
        if (err) {
            res.json({ failure: 'Removal Error' });
        } else {
            res.json({ success: true });
        }
    })
})

router.get('/posts', function (req, res) {
    if (tokenChecker(req.headers.token)) {
        res.json({ error: "Invalid token" });
    } else {
        Post.find({}, function (err, arr) {
            if (err) {
                res.json({ error: "Failed to query posts." });
            } else {
                res.json({
                    success: true,
                    response: arr.slice(0, 10),
                });
            }
        })
    }
})

router.get('/posts/:page', function (req, res) {
    if (tokenChecker(req.headers.token)) {
        res.json({ error: "Invalid token" });
    } else {
        Post.find({}, function (err, arr) {
            if (err) {
                res.json({ error: "Failed to query posts." });
            } else {
                var postAccess = parseInt(req.params.page) * 10;
                var sliced = arr.slice(postAccess - 10, postAccess);
                res.json({
                    success: true,
                    response: sliced,
                });
            }
        })
    }
});

router.post('/posts', function (req, res) {
    Token.find({ token: req.headers.token }, function (err, t) {
        if (err) {
            res.json({ error: "Invalid token." });
        } else {
            User.findOne({id: t.userId }, function (err, u) {
                if (err) {
                    res.json({ error: "User find error." });
                } else {
                    var newPost = new Post({
                        poster: {
                            name: u.fname + ' ' + u.lname,
                            id: u._id
                        },
                        content: req.body.content,
                        createdAt: new Date(),
                        comments: [],
                        likes: []
                    })
                    newPost.save(function (err) {
                        if (err) {
                            res.json({ error: "Post save error." });
                        } else {
                            res.json({
                                success: true,
                                response: newPost
                            });
                        }
                    })
                }
            })
        }
    })
})

router.get('/posts/comments/:post_id', function (req, res) {
    if (tokenChecker(req.headers.token)) {
        res.json({ error: "Invalid token." });
    } else {
        Post.findOne({ _id: req.params.post_id }, function (err, p) {
            if (err) {
                res.json({ error: "Invalid post id" });
            } else {
                res.json({
                    success: true,
                    response: p.comments
                });
            }
        });
    }
});

router.post('/posts/comments/:post_id', function (req, res) {
    if (!req.body.content) {
        res.json({ error: "No content detected" });
    } else {
        Token.findOne({ token: req.headers.token }, function (err, t) {
            if (err) {
                res.json({ error: "Invalid token." });
            } else {
                User.findById(t.userId, function (err, u) {
                    if (err) {
                        res.json({ error: "User find error." });
                    } else {
                        var newComment = {
                            poster: {
                                name: u.fname + ' ' + u.lname,
                                id: u._id
                            },
                            content: req.body.content,
                            createdAt: new Date(),
                        }
                        Post.findById(req.params.post_id, function (err, p) {
                            if (err) {
                                res.json({ error: "Post find error." });
                            } else {
                                p.comments.push(newComment);
                                p.save();
                                res.json({
                                    success: true,
                                    response: p
                                });
                            }
                        })
                    }
                })
            }
        })
    }
})

router.get('/posts/likes/:post_id', function (req, res) {
    Token.findOne({ token: req.headers.token }, function (err, t) {
        if (err) {
            res.json({ error: "Invalid token." });
        } else {
            console.log(t);
            User.findById(t.userId, function (err, u) {
                console.log(u);
                if (err) {
                    res.json({ error: "User find error." });
                } else {
                    var newLike = {
                        name: u.fname,
                        posterId: u.id
                    }
                    Post.findById(req.params.post_id, function (err, p) {
                        if (err) {
                            res.json({ error: "Post find error." });
                        } else {
                            var idx = 0;
                            var found = false
                            p.likes.some(function (like, i) {
                                if (like.posterId === u.id) {
                                    idx = i;
                                    found = true
                                    return true
                                }
                            });
                            if (found) {
                                console.log("splicing");
                                p.likes.splice(idx, 1);
                            } else {
                                console.log("pushing")
                                p.likes.push(newLike);
                            }
                            p.save(function(){
                                res.json({
                                    success: true,
                                    response: p
                                });
                            });
                           
                        }
                    })
                }
            })
        }
    })
});

var tokenChecker = function (token) {
    Token.find({ token: token }, function (err) {
        if (err) {
            return true;
        }
        return false;
    });
};

module.exports = router;