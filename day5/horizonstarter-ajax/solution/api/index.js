"use strict";

/**
 * AJAX endpoints (API) go here.
 * Mounted as express app inside top-level app at master API endpoint, e.g.,
 * /api/1.
 *
 * NOTE: The way we _consume_ the request (validation, etc.) here is very
 * similar to the way we consume it in the HTML routes in index.js, but the way
 * we structure the response is very different.
 *
 * These hooks DO NOT return HTML since they are not for browser consumption!
 * They return appropriate HTTP status codes and JSON data.
 */

var express = require('express');
var validator = require('express-validator');
var router = express.Router();
var Project = require('../model/project');
var bodyParser = require('body-parser');
var validator = require('express-validator');

// Create the (sub) app.
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

/**
 * POST /project/:projectId/contribution
 *
 * Adds a new contribution to an existing project.
 * NOTE: duplicates some logic from app route in index.js.
 */
router.post('/project/:projectId/contribution', function(req, res) {
  // Look up the project.
  Project.findById(req.params.projectId, function (err, project) {
    // The project ID doesn't exist.
    if (err) {
      res.status(404).json(err);
      return;
    }

    // We got a project. Add the contribution.

    // Validate the input.
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('amount', 'Amount is required').notEmpty();
    req.checkBody('amount', 'Amount must be an integer').isInt();
    var errors = req.validationErrors();
    if (errors) {
      res.status(400).json(errors);
      return;
    }

    // Save this object so we can return it.
    // Note: normally we'd need to return the actual data from the DB with an
    // ID, but we keep it simple and just return this raw data. These
    // contribution objects don't have their own model and they're not really
    // interactive in our app so it works.
    var newContribution = {
      name: req.body.name,
      comment: req.body.comment,
      amount: req.body.amount
    };
    project.contributions.push(newContribution);
    project.save(function(err) {
      console.error(err);
      if (err) {
        res.status(500).json(err);
        return;
      }
      // Send success: no need to return any data!
      res.status(201).json(newContribution);
    });
  });
});
