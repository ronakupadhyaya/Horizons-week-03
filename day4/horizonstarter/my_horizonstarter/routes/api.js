var express = require("express");
var models = require('../models/models');
var router = express.Router();

router.post('/project/:id/contribute', function(req, res) {
  console.log("here")
  var update = {
    "$push": {
      contributions: req.body
    }
  };
  models.project.findByIdAndUpdate(req.params.id, update, function(error, project) {
    console.log(project);
    if(error) {
      res.status(400).json(error);
    } else {
      res.json(project);
    }
  });
});

module.exports = router;