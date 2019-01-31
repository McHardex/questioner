'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Helper = function () {
  function Helper() {
    _classCallCheck(this, Helper);
  }

  _createClass(Helper, null, [{
    key: 'hashPassword',

    /**
     * @description - Hash password method
     * @param {string} - password
     * @returns {string} - returns the hashed password
    */

    value: function hashPassword(password) {
      return _bcrypt2.default.hashSync(password, _bcrypt2.default.genSaltSync(10));
    }

    /**
    * @description - compares password
    * @param {string} - password
    * @returns {Boolean} - returns true or false
    */

  }, {
    key: 'comparePassword',
    value: function comparePassword(hashPassword, password) {
      return _bcrypt2.default.compareSync(password, hashPassword);
    }

    /**
     * @description - chech if email is valid
     * @param {string} - email
     * @returns {Boolean} - returns true or false
     */

  }, {
    key: 'isValidEmail',
    value: function isValidEmail(email) {
      return (/\S+@\S+\.\S+/.test(email)
      );
    }

    /**
     * @description - generates token
     * @param {string} - id
     * @returns {string} - token
     */

  }, {
    key: 'generateToken',
    value: function generateToken(id) {
      var token = _jsonwebtoken2.default.sign({ userID: id }, process.env.SECRET, { expiresIn: '24h' });
      return token;
    }
  }]);

  return Helper;
}();

exports.default = Helper;