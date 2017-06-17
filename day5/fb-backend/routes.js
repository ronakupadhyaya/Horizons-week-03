"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var User = require('./models').User;
var Post = require('./models').Post;
var Token = require('./models').Token;
// var strftime = require('strftime');
var _ = require('underscore')


//// User routes

// POST / api / users / register
// POST / api / users / login
// POST / api / users / logout(🔒)

router.post('/api/users/register', function (req, res) {
  console.log(req.body);
  var user = new User({
    fname: req.body.fname,
    lname: req.body.lnamem,
    email: req.body.email,
    password: req.body.password
  });
  user.save(function (err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json({
        "success": "Success",
        "body": req.body
      });
    }
  });
});


router.post('/api/users/login', function (req, res) {

  var email = req.body.email;
  var password = req.body.password;

  User.findOne({
    email: email,
    password: password
  }, function (err, person) {
    if (err) {
      console.log("couldnot find");
    } else {
      if (person === null) {
        console.log("no prseo");
      } else {
        console.log("there is person");

        var token = new Token({
          userId: person._id,
          token: req.body.email + new Date().toString(),
          createdAt: new Date()
        });

        token.save(function (err) {
          if (err) {
            res.status(500).json(err);
          } else {
            res.json({
              "success": "Success",

            });
          }
        });


      }
    }
  });

});

router.post('/api/users/logout', function (req, res) {
  var token = req.body.token;
  Token.findOneAndRemove({
    token: token
  }, function (err, doc, result) {

    ///if doc is null nothing was remoced the item is not on the server
    console.log("doc", doc, "result", result);
    if (err) {
      res.json({
        "error": "no token"
      })
      //console.log("err");
    } else {

      if (token === undefined) {
        res.json({
          "error": "couldnot delete"
        });
      } else {

        res.json({
          "success": "log out"
        });
      }
      //console.log(p);
    }
  });
});

router.get("/api/posts/", function (req, res) {

  Token.findOne({
    token: req.query.token
  }, function (err, person) {
    if (err) {
      res.json({
        "error": "connection network error"
      });
    } else {
      if (person === null) {
        res.json({
          "error": "token is not exist"
        });
      } else {


        //check if user is in the server if yes send

        User.findOne({
          _id: person.userId
        }, function (err, person) {
          if (err) {
            res.json({
              "error": "connection network error"
            });
          } else {
            if (person === null) {
              res.json({
                "error": "person is not matching to the token"
              });
            } else {

              console.log("searching 2");

              Post.find().limit(10).exec(function (err, array) {
                res.json(array);
              });

            }
          }
        });
      }
    }
  });


});

router.get("/api/posts/:page", function (req, res) {
  var pages = req.params.page * 10;
  console.log(pages);

  Token.findOne({
    token: req.query.token
  }, function (err, person) {
    if (err) {
      res.json({
        "error": "connection network error"
      });
    } else {
      if (person === null) {
        res.json({
          "error": "token is not exist"
        });
      } else {


        //check if user is in the server if yes send

        User.findOne({
          _id: person.userId
        }, function (err, person) {
          if (err) {
            res.json({
              "error": "connection network error"
            });
          } else {
            if (person === null) {
              res.json({
                "error": "person is not matching to the token"
              });
            } else {

              console.log("searching 2");

              Post.find().skip(pages).exec(function (err, array) {
                res.json(array);
              });

            }
          }
        });
      }
    }
  });
});

router.post("/api/posts/", function (req, res) {
  var content = req.body.content;
  var token = req.body.token;

  Token.findOne({
    token: token
  }, function (err, person) {
    if (err) {
      res.json({
        "error": "connection network error"
      });
    } else {
      if (person === null) {
        res.json({
          "error": "token is not exist"
        });
      } else {


        //check if user is in the server if yes send

        User.findOne({
          _id: person.userId
        }, function (err, person1) {
          if (err) {
            res.json({
              "error": "connection network error"
            });
          } else {
            if (person1 === null) {
              res.json({
                "error": "person is not matching to the token"
              });
            } else {

              console.log("searching 2");

              var post = new Post({
                poster: {
                  name: person1.fname,
                  id: person1._id
                },
                content: content,
                likes: [],
                comments: [],
                createdAt: new Date()
              });


              post.save(function (err, doc) {
                if (err) {
                  res.status(500).json(err);
                } else {
                  res.json({
                    "success": "Success",
                    "response": doc
                  });
                }
              });



            }
          }
        });
      }
    }
  });




});

router.get("/api/posts/comments/:post_id", function (req, res) {

  // TODO:  start from here finish this function
  var token = req.body.token;
  Token.findOneAndRemove({
    token: token
  }, function (err, doc, result) {

    ///if doc is null nothing was remoced the item is not on the server
    console.log("doc", doc, "result", result);
    if (err) {
      res.json({
        "error": "no token"
      })
      //console.log("err");
    } else {

      if (token === undefined) {
        res.json({
          "error": "couldnot delete"
        });
      } else {

        res.json({
          "success": "log out"
        });
      }
      //console.log(p);
    }
  });


});

router.post("/api/posts/comments/:post_id", function (req, res) {

});

router.get("/api/posts/likes/:post_id", function (req, res) {

});



module.exports = router;



module.exports = router;
