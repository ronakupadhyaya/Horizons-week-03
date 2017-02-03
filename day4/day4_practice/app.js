var express = require('express');
var app = express();

app.use('/test', function(req, res) {
  res.json({
    method: req.method,
    body: req.body,
    query: req.query,
    params: req.params
  });
});
