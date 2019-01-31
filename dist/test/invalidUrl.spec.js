'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('INVALID ROUTE', function () {
  it('should return 404 error when invalid route is visited', function (done) {
    (0, _supertest2.default)(_index2.default).get('/api/v1/thisUrlDoesNotExist').end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(404);
      (0, _chai.expect)(res.body).to.have.property('error');
      (0, _chai.expect)(res.body.error).to.equal('Route not found, please enter a valid url');
      done();
    });
  });
}); /* eslint-disable no-unused-vars */