// "use strict";
//
// var express = require('express');
// var validator = require('express-validator');
// var logger = require('morgan');
// var bodyParser = require('body-parser');
//
// var Project = require('../model/project');
//
// var app = express();
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(validator())
//
// app.route('/project/:projectId/contribution').get(function(req, res) {
//   Project.findById(req.params.projectId, function(err, project) {
//     if (err) {
//       console.log(err);
//       res.json(err);
//     };
//     req.checkBody('name', 'Name is required!').notEmpty();
//     req.checkBody('amount', 'Contribution amount needed to contribute!').notEmpty();
//     req.checkBody('amount', 'Contribution amount needs to be a number!').isInt();
//     req.checkBody('amount', 'Contribution needs to be above zero!').isGreaterThanZero();
//     var errors = req.validationErrors();
//     if (errors) {
//       console.log(errors)
//       res.status(400).json(errors)
//     } else {
//       var contributor = {
//         name: req.body.name,
//         amount: req.body.amount
//       };
//       project.contributions.push(contributor);
//       project.save(function(err) {
//         if (err) {
//           res.json(err);
//         } else {
//           res.json(contributor);
//         };
//       });
//     }
//   });
// });
