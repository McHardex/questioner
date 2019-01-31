'use strict';

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _userDb = require('../../models/userDb');

var _userDb2 = _interopRequireDefault(_userDb);

var _questionDb = require('../../models/questionDb');

var _questionDb2 = _interopRequireDefault(_questionDb);

var _rsvpDb = require('../../models/rsvpDb');

var _rsvpDb2 = _interopRequireDefault(_rsvpDb);

var _meetupDb = require('../../models/meetupDb');

var _meetupDb2 = _interopRequireDefault(_meetupDb);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config(); /* eslint-disable no-unused-vars */
/* eslint-disable no-console */


var client = new _pg.Client(_config2.default);

var createQuery = function createQuery(query) {
  client.connect(function (err) {
    if (err) {
      console.error('error connecting to ' + _config2.default, err.message);
    } else {
      console.log('connected to ' + _config2.default);
    }
  });

  client.query(query).then(function (res) {
    console.log('tables created successfully');
    client.end().then(function () {
      return console.log('client has disconnected');
    }).catch(function (err) {
      return console.error('error during disconnection', err.stack);
    });
  }).catch(function (err) {
    console.log(err, 'error creating tables');
    client.end().then(function () {
      return console.log('client has disconnected');
    }).catch(function (err) {
      return console.error('error during disconnection', err.stack);
    });
  });
};

createQuery('' + _userDb2.default + _meetupDb2.default + _questionDb2.default + _rsvpDb2.default);