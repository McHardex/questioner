'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable consistent-return */


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

var QuestionController = function () {
  function QuestionController() {
    _classCallCheck(this, QuestionController);
  }

  _createClass(QuestionController, null, [{
    key: 'getAllQuestions',

    /**
     * @description - Get all offers
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @return{json}
    */
    value: function getAllQuestions(req, res) {
      client.query('SELECT * FROM asknow ORDER by id ASC', function (error, results) {
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
    key: 'createQuestion',
    value: function createQuestion(req, res) {
      client.query('SELECT * FROM meetups WHERE id = $1', [req.body.meetup_id], function (error, results) {
        if (results.rows === undefined || results.rows.length === 0) {
          return res.status(404).json({
            status: 404,
            error: 'meetup does not exist'
          });
        }

        client.query('INSERT INTO asknow (title, body, meetup_id) VALUES ($1, $2, $3) RETURNING *', [req.body.title, req.body.body, req.body.meetup_id], function (err, response) {
          if (err) return res.status(400).json({ status: 400, error: err });
          res.status(201).json({
            status: 201,
            data: [{
              createdBy: req.user,
              meetup_id: results.rows[0].id,
              title: response.rows[0].title,
              body: response.rows[0].body
            }]
          });
        });
      });
    }
  }, {
    key: 'upvoteQuestion',
    value: function upvoteQuestion(req, res) {
      client.query('SELECT * FROM asknow WHERE id = $1', [req.params.question_id], function (err, resp) {
        if (err) res.status(404).json({ status: 404, error: err });
        client.query('UPDATE asknow SET votes = votes + 1 WHERE id = ' + req.params.question_id, function (error, response) {
          if (error || response.rowCount < 1) {
            res.status(404).json({
              status: 404,
              error: 'Unable to upvote! No question found'
            });
          } else {
            res.status(200).json({
              status: 200,
              data: [{
                title: resp.rows[0].title,
                body: resp.rows[0].body,
                votes: resp.rows[0].votes += 1
              }]
            });
          }
        });
      });
    }
  }, {
    key: 'downvoteQuestion',
    value: function downvoteQuestion(req, res) {
      client.query('SELECT * FROM asknow WHERE id = $1', [req.params.question_id], function (err, resp) {
        if (err) res.status(404).json({ status: 404, error: err });
        client.query('UPDATE asknow SET votes = votes - 1 WHERE id = ' + req.params.question_id, function (error, response) {
          if (error || response.rowCount < 1) {
            res.status(404).json({
              status: 404,
              error: 'Unable to downvote! No question found'
            });
          } else {
            res.status(200).send({
              status: 200,
              data: [{
                title: resp.rows[0].title,
                body: resp.rows[0].body,
                votes: resp.rows[0].votes -= 1
              }]
            });
          }
        });
      });
    }
  }]);

  return QuestionController;
}();

exports.default = QuestionController;