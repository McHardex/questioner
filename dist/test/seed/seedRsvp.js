'use strict';

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config(); /* eslint-disable no-console */
/* eslint-disable no-unused-vars */


require('dotenv').config();

var sql = 'INSERT INTO rsvps (id, meetup_id, user_id, response) VALUES($1,$2,$3,$4)';

var data = [1, 1, 1, 'yes'];

var client = new _pg.Client(_config2.default);
client.connect(function (err) {
  if (err) {
    console.error('error connecting to database', err.stack);
  } else {
    console.log('connected to ' + _config2.default);
  }
});

client.query(sql, data).then(function (res) {
  console.log('rsvp table populated');
  client.end();
}).catch(function (err) {
  console.log(err, 'error creating tables');
  client.end();
});