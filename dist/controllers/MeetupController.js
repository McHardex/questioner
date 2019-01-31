'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable consistent-return */
/* eslint-disable no-console */


var _pg = require('pg');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('dotenv').config();

var client = new _pg.Client(_config2.default);
client.connect();

var MeetupController = function () {
  function MeetupController() {
    _classCallCheck(this, MeetupController);
  }

  _createClass(MeetupController, null, [{
    key: 'getAllMeetups',

    /**
     * @description - Get all offers
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @return{json}
    */
    value: function getAllMeetups(req, res) {
      client.query('SELECT * FROM meetups ORDER by id ASC', function (error, results) {
        if (results.rows.length < 1) {
          return res.status(404).json({
            status: 404,
            error: 'No meetup record found'
          });
        }
        res.status(200).json({
          status: 200,
          data: results.rows
        });
      });
    }
  }, {
    key: 'upcomingMeetups',
    value: function upcomingMeetups(req, res) {
      client.query('SELECT * FROM meetups WHERE happeningOn > now()', function (error, results) {
        if (error) {
          return res.status(404).json({
            status: 404,
            error: 'There is no upcoming meetups'
          });
        }
        if (results.rows.length < 1) {
          return res.status(404).json({
            status: 404,
            error: 'there are no upcoming meetups'
          });
        }
        res.status(200).json({
          status: 200,
          data: results.rows
        });
      });
    }
  }, {
    key: 'getSpecificMeetupRecord',
    value: function getSpecificMeetupRecord(req, res) {
      client.query('SELECT * FROM meetups WHERE id = $1', [req.params.id], function (error, results) {
        if (results.rows.length < 1) return res.status(404).json({ status: 404, error: 'Meetup record does not exist' });
        res.status(200).json({
          status: 200,
          data: results.rows
        });
      });
    }
  }, {
    key: 'createMeetup',
    value: function createMeetup(req, res) {
      var _req$body = req.body,
          topic = _req$body.topic,
          location = _req$body.location,
          happeningOn = _req$body.happeningOn,
          tags = _req$body.tags;

      client.query('SELECT * FROM users WHERE id = $1', [req.user], function (err, result) {
        if (result.rows.length < 1) return res.status(404).send({ status: 404, error: 'User not found' });
        if (result.rows[0].isadmin) {
          client.query('INSERT INTO meetups \n        (topic, location, happeningOn, tags) VALUES ($1, $2, $3, $4) RETURNING *', [topic, location, happeningOn, tags], function (error, results) {
            if (error) {
              res.status(404).json({
                status: 404,
                error: 'Meetup already exists, try creating a new one'
              });
            } else {
              return res.status(201).json({
                status: 201,
                data: [results.rows[0]]
              });
            }
          });
        } else {
          res.status(401).json({ status: 401, error: 'Sorry, only Admin can perform this action' });
        }
      });
    }
  }, {
    key: 'deleteMeetup',
    value: function deleteMeetup(req, res) {
      client.query('SELECT * FROM users WHERE id = $1', [req.user], function (err, result) {
        if (err) return res.status(400).json({ status: 400, error: err });
        if (result.rows[0].isadmin) {
          client.query('DELETE FROM meetups WHERE id = $1', [req.params.id], function (error, response) {
            if (response.rowCount < 1) {
              res.status(404).json({
                status: 404,
                message: 'This meetup is no longer available'
              });
            } else {
              res.status(200).json({
                status: 200,
                message: 'Meetup successfully deleted'
              });
            }
          });
        } else {
          res.status(401).json({ status: 401, error: 'Sorry, only Admin can perform this action' });
        }
      });
    }
  }, {
    key: 'updateMeetup',
    value: function updateMeetup(req, res) {
      client.query('SELECT * FROM users WHERE id = $1', [req.user], function (error, result) {
        if (error) return res.status(404).json({ status: 404, error: 'User not found!' });
        if (result.rows[0].isadmin) {
          var _req$body2 = req.body,
              topic = _req$body2.topic,
              location = _req$body2.location,
              happeningOn = _req$body2.happeningOn,
              tags = _req$body2.tags;

          client.query('UPDATE meetups SET topic = $1, location = $2, happeningOn = $3, tags = $4 WHERE id = $5', [topic, location, happeningOn, tags, req.params.id], function (err, response) {
            if (response.rowCount < 1) {
              res.status(404).json({
                status: 404,
                error: 'Unable to update! No meetup found'
              });
            } else {
              res.status(200).json({
                status: 200,
                message: response.rows
              });
            }
          });
        } else {
          return res.status(401).json({ status: 401, error: 'Sorry, only Admin can perform this action' });
        }
      });
    }
  }]);

  return MeetupController;
}();

exports.default = MeetupController;