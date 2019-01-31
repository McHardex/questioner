'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var express = require('express');

// set up the express app
var app = express();

require('./startup/routes')(app);

var port = process.env.PORT || 2000;
var server = app.listen(port, function () {
  /* eslint-disable no-console */
  console.log('questioner listening on port ' + port);
});

exports.default = server;