'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable consistent-return */


var _pg = require('pg');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _Helpers = require('./helpers/Helpers');

var _Helpers2 = _interopRequireDefault(_Helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var client = new _pg.Client(_config2.default);
client.connect();

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: 'signUp',

    /**
     * @description - creates a new user in the application
     * @param {Object} req - api request
     * @param {Object} res - route response
     * @returns {json} registered user details
    */

    value: function signUp(req, res) {
      var hashPassword = _Helpers2.default.hashPassword(req.body.password);
      var query = 'INSERT INTO\n      users (firstname, lastname, othername, username, phoneNumber, email, isadmin, password)\n      VALUES($1, $2, $3, $4, $5, $6, $7, $8)\n      returning *';
      var values = [req.body.firstname, req.body.lastname, req.body.othername, req.body.username, req.body.phoneNumber, req.body.email, req.body.isAdmin, hashPassword];
      client.query(query, values, function (error, results) {
        if (error) {
          res.status(409).json({
            status: 409,
            error: 'User exists, check your credentials'
          });
        } else {
          var token = _Helpers2.default.generateToken(results.rows[0].id);
          return res.status(201).json({
            status: 201,
            data: {
              token: token,
              user: {
                id: results.rows[0].id,
                username: results.rows[0].username,
                email: results.rows[0].email,
                isAdmin: results.rows[0].isadmin,
                registered: results.rows[0].registered
              }
            }
          });
        }
      });
    }

    /**
     * @description - Log in to the application
     * @param {Object} - response
     * @param {object} - request
     * @returns {Object} - user Object
     */

  }, {
    key: 'login',
    value: function login(req, res) {
      client.query('SELECT * FROM users WHERE email = $1', [req.body.email], function (error, results) {
        if (error) {
          res.status(409).json({
            status: 409,
            error: error
          });
        }
        if (results.rows.length < 1) {
          res.status(404).json({
            status: 404,
            error: 'No such user in our database'
          });
        } else if (results.rows[0].email !== req.body.email || !_Helpers2.default.comparePassword(results.rows[0].password, req.body.password)) {
          res.status(400).json({
            status: 400,
            error: 'Invalid credentials'
          });
        } else {
          var token = _Helpers2.default.generateToken(results.rows[0].id);
          res.status(200).json({
            status: 200,
            data: [{
              token: token,
              user: {
                email: results.rows[0].email,
                username: results.rows[0].username,
                isAdmin: results.rows[0].isadmin
              }
            }]
          });
        }
      });
    }
  }]);

  return UserController;
}();

exports.default = UserController;