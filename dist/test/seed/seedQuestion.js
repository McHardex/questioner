'use strict';

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
_dotenv2.default.config();

var sql = 'INSERT INTO asknow (createdOn, createdBy, meetup_id, title, body, votes) VALUES($1,$2,$3,$4,$5,$6)';

var data = [(0, _moment2.default)(new Date()), 1, 1, 'what have you learnt so far?', 'Tolerance, adaptability, collaboration, time management', 2];

var client = new _pg.Client(_config2.default);
client.connect(function (err) {
  if (err) {
    console.error('error connecting to database', err.stack);
  } else {
    console.log('connected to ' + _config2.default);
  }
});

client.query(sql, data).then(function (res) {
  console.log('question table populated');
  client.end();
}).catch(function (err) {
  console.log(err, 'error creating tables');
  client.end();
});