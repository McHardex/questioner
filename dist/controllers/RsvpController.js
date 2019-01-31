'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable consistent-return */
/* eslint-disable no-console */

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.config();

var client = new _pg.Client(_config2.default);
client.connect();

var RsvpController = function () {
  function RsvpController() {
    _classCallCheck(this, RsvpController);
  }

  _createClass(RsvpController, null, [{
    key: 'getAllRsvps',

    /**
     * @description - Get all offers
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @return{json}
    */

    value: function getAllRsvps(req, res) {
      client.query('SELECT * FROM rsvps ORDER by id ASC', function (error, results) {
        if (results.rows.length < 1) {
          return res.status(404).json({
            status: 404,
            error: 'No rsvp record found'
          });
        }
        res.status(201).json({
          status: 201,
          data: results.rows
        });
      });
    }
  }, {
    key: 'createRsvp',
    value: function createRsvp(req, res) {
      var responseArray = ['yes', 'no', 'maybe'];
      client.query('SELECT * FROM users WHERE id = $1', [req.user], function (error, resp) {
        if (resp.rowCount < 1) {
          return res.status(404).send({
            status: 404,
            error: 'User does not exist'
          });
        }
        client.query('SELECT * FROM meetups WHERE id = $1', [req.params.meetup_id], function (err, response) {
          if (response.rowCount < 1) {
            return res.status(404).json({
              status: 404,
              error: 'meetup does not exist'
            });
          }
          if (responseArray.includes(req.body.response)) {
            client.query('INSERT INTO rsvps (meetup_id, user_id, response) VALUES ($1, $2, $3) RETURNING *', [req.user, response.rows[0].id, req.body.response], function (e, result) {
              if (e) {
                res.status(409).json({
                  status: 409,
                  error: 'You can only respond once'
                });
              } else {
                res.status(201).json({
                  status: 201,
                  data: [{
                    meetup_id: response.rows[0].id,
                    topic: response.rows[0].topic,
                    response: result.rows[0].response
                  }]
                });
              }
            });
          } else {
            return res.status(400).json({
              status: 400,
              error: 'Respond only with yes, no or maybe'
            });
          }
        });
      });
    }
  }]);

  return RsvpController;
}();

exports.default = RsvpController;