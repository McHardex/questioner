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

var CommentController = function () {
  function CommentController() {
    _classCallCheck(this, CommentController);
  }

  _createClass(CommentController, null, [{
    key: 'comment',

    /**
     * @description - enables users comment on questions
     * @param {Object} req - api request
     * @param {Object} res - route response
     * @returns {json} question details and the comment
    */

    value: function comment(req, res) {
      client.query('SELECT * FROM asknow WHERE id = $1', [req.body.question_id], function (error, results) {
        if (error) {
          res.status(409).json({
            status: 409,
            error: error
          });
        }
        if (results.rows === undefined || results.rows.length === 0) {
          res.status(404).json({
            status: 404,
            error: 'question does not exist'
          });
        }
        client.query('INSERT INTO asknow (comment, question_id) VALUES ($1, $2) RETURNING *', [req.body.comment, req.body.question_id], function (err, response) {
          if (err) throw err;
          return res.status(201).json({
            status: 201,
            data: [{
              question_id: results.rows[0].id,
              title: results.rows[0].title,
              body: results.rows[0].body,
              comment: response.rows[0].comment
            }]
          });
        });
      });
    }
  }]);

  return CommentController;
}();

exports.default = CommentController;