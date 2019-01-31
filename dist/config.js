'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var config = {
  development: process.env.DB_URL,
  test: process.env.TEST_DB,
  production: process.env.DATABASE_URL
};

var setConnectionString = void 0;
if (process.env.NODE_ENV === 'test') {
  setConnectionString = config.test;
} else if (process.env.NODE_ENV === 'production') {
  setConnectionString = config.production;
} else {
  setConnectionString = config.development;
}

var connectionString = setConnectionString;
exports.default = connectionString;