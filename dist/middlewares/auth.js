'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config(); /* eslint-disable consistent-return */

var _require = require('pg'),
    Pool = _require.Pool;

var pool = new Pool({ connectionString: process.env.DB_URL });

var auth = function auth(req, res, next) {
  var token = req.headers['x-auth-token'];
  if (!token) return res.status(401).json({ status: 401, error: 'No Token provided' });

  try {
    var decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);

    var text = 'SELECT * from users WHERE id = $1';

    pool.query(text, [decoded.userID]);

    req.user = decoded.userID;
    next();
  } catch (error) {
    return res.status(422).json({
      status: 422,
      error: error.message
    });
  }
};

exports.default = auth;