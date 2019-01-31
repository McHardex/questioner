'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Welcome', function () {
  describe('GET /', function () {
    it('should return status code 200 on success', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/v1/welcome').end(function (err, res) {
        (0, _chai.expect)(res.statusCode).to.equal(200);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.property('data');
        (0, _chai.expect)(res.body.data).to.have.keys('message', 'endpoints');
        done();
      });
    });
  });
}); /* eslint-disable no-unused-vars */