'use strict';

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

// seed user to database
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

var hashedPassword = _bcrypt2.default.hashSync('password', 10);

var sql = 'INSERT INTO\nusers (firstname, lastname, othername, username, phoneNumber, email, password, isAdmin)\nVALUES($1, $2, $3, $4, $5, $6, $7, $8)';

var data1 = ['bukunmi', 'adebisi', 'joseph', 'mchardex', '08160601644', 'bukunm@gmail.com', hashedPassword, true];

var data2 = ['olawale', 'Afosi', 'muideen', 'marquez', '12345677888999', 'davedfdfd@gmail.com', hashedPassword, false];

var client = new _pg2.default.Client(_config2.default);

var client2 = new _pg2.default.Client(_config2.default);

client.connect();
client2.connect();

client.query(sql, data1, function (err) {
  if (err) {
    client.end();
    console.log(err.stack);
  } else {
    client.end();
    console.log('user1 inserted');
  }
});

client2.query(sql, data2, function (err) {
  if (err) {
    client2.end();
    console.log(err.stack);
  } else {
    client2.end();
    console.log('user2 inserted');
  }
});

// seed meetup to database
var client3 = new _pg2.default.Client(_config2.default);
var meetup = 'INSERT INTO meetups (topic, location, happeningOn, tags) VALUES($1,$2,$3,$4)';

var data = ['excellence archievers commitee', 'ajegunle', '2018-07-27', ['bukunmi', 'sola', 'ola']];

client3.query(meetup, data).then(function (res) {
  console.log('tables created successfully');
  client.end();
}).catch(function (err) {
  console.log(err, 'error creating tables');
  client.end();
});