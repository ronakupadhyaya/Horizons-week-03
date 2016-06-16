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

    project.contributions.push({
      name: req.body.name,
      comment: req.body.comment,
      amount: req.body.amount
    });
    project.save(function(err) {
      console.error(err);
      if (err) {
        res.status(500).json(err);
        return;
      }
      // Send success: no need to return any data!
      res.status(201).json({status:"ok"});
    });
  });
});
