'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Helpers = require('../../controllers/helpers/Helpers');

var _Helpers2 = _interopRequireDefault(_Helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loginValidation = function loginValidation(req, res, next) {
  if (!req.body.password || !req.body.email) {
    return res.status(400).send({
      status: 400,
      error: 'Please ensure to fill all input field'
    });
  }

  if (!_Helpers2.default.isValidEmail(req.body.email)) {
    return res.status(400).send({
      status: 400,
      error: 'Please enter a valid email address'
    });
  }
  next();
}; /* eslint-disable consistent-return */

exports.default = loginValidation;