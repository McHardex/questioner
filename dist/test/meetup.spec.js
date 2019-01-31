'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config(); /* eslint-disable no-unused-vars */
/* eslint-disable no-console */


var wrongtoken = 'wrong token';
var token = _jsonwebtoken2.default.sign({ userID: 1 }, process.env.SECRET);

describe('Meetups', function () {
  describe('GET /meetups', function () {
    describe('GET /meetups/', function () {
      it('should return status code 401 when no token is provided', function (done) {
        (0, _supertest2.default)(_index2.default).get('/api/v1/meetups').end(function (err, res) {
          (0, _chai.expect)(res.status).to.equal(401);
          (0, _chai.expect)(res.body).to.be.an('object');
          (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
          (0, _chai.expect)(res.body.error).to.equal('No Token provided');
          done();
        });
      });

      it('should return status code 422(unprocessable entity) when an invalid token is passed', function (done) {
        (0, _supertest2.default)(_index2.default).get('/api/v1/meetups').set('x-auth-token', wrongtoken).end(function (err, res) {
          console.log(res.body);
          (0, _chai.expect)(res.status).to.equal(422);
          (0, _chai.expect)(res.body).to.be.an('object');
          (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
          (0, _chai.expect)(res.body.error).to.equal('jwt malformed');
          done();
        });
      });
    });

    describe('GET /meetups/meetup-id', function () {
      it('should return status code 401 when no token is provided', function (done) {
        (0, _supertest2.default)(_index2.default).get('/api/v1/meetups/1').end(function (err, res) {
          (0, _chai.expect)(res.status).to.equal(401);
          (0, _chai.expect)(res.body).to.be.an('object');
          (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
          (0, _chai.expect)(res.body.error).to.equal('No Token provided');
          done();
        });
      });

      it('should return status code 422(unprocessable entity) when an invalid token is passed', function (done) {
        (0, _supertest2.default)(_index2.default).get('/api/v1/meetups/1').set('x-auth-token', wrongtoken).end(function (err, res) {
          (0, _chai.expect)(res.status).to.equal(422);
          (0, _chai.expect)(res.body).to.be.an('object');
          (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
          (0, _chai.expect)(res.body.error).to.equal('jwt malformed');
          done();
        });
      });
    });

    describe('GET /meetups/upcoming', function () {
      it('should return status code 401 when no token is passed there is no upcoming', function (done) {
        (0, _supertest2.default)(_index2.default).get('/api/v1/meetups/upcoming').end(function (err, res) {
          (0, _chai.expect)(res.status).to.equal(401);
          (0, _chai.expect)(res.body).to.be.an('object');
          (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
          (0, _chai.expect)(res.body.error).to.equal('No Token provided');
          done();
        });
      });

      it('should return status code 404 when no token is passed there is no upcoming meetup', function (done) {
        (0, _supertest2.default)(_index2.default).get('/api/v1/meetups/upcoming').set('x-auth-token', token).end(function (err, res) {
          (0, _chai.expect)(res.status).to.equal(404);
          (0, _chai.expect)(res.body).to.be.an('object');
          (0, _chai.expect)(res.body.error).to.equal('there are no upcoming meetups');
          done();
        });
      });
    });
  });

  describe('POST /meetups', function () {
    it('should return status code 401 when no token is passed', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/meetups').send({
        topic: 'challenge trading hour',
        location: 'lagos',
        happeningOn: '2018-12-22',
        tags: ['apple', 'coding', 'legend']
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(401);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('No Token provided');
        done();
      });
    });

    it('should return status code 422 when invalid token is passed', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/meetups').set('x-auth-token', wrongtoken).send({
        topic: 'challenge trading hour',
        location: 'lagos',
        happeningOn: '2018-12-22',
        tags: ['apple', 'coding', 'legend']
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(422);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('jwt malformed');
        done();
      });
    });

    it('should return status code 400 with incomplete payload (tags)', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/meetups').set('x-auth-token', token).send({
        topic: 'Progress Party',
        location: 'lagos',
        happeningOn: '22-04-2020'
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(400);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('tags is required');
        done();
      });
    });

    it('should return status code 400 when tags length is less than 3(tags)', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/meetups').set('x-auth-token', token).send({
        topic: 'Progress Party',
        location: 'lagos',
        happeningOn: '22-04-2020',
        tags: ['bukunmi']
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(400);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('Please add a minimum of three(3) tags');
        done();
      });
    });

    it('should fail on POST with incomplete payload(location)', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/meetups').set('x-auth-token', token).send({
        topic: 'Bootcamp',
        tags: 'apple',
        happeningOn: '23-12-2019'
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(400);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('location is required');
        done();
      });
    });

    it('should fail on POST with incomplete payload(location)', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/meetups').set('x-auth-token', token).send({
        topic: 'Bootcamp',
        location: 'a',
        tags: 'apple',
        happeningOn: '23-12-2019'
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(400);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('location length must be greater than 3');
        done();
      });
    });

    it('should fail on POST with incomplete payload (date)', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/meetups').set('x-auth-token', token).send({
        topic: 'javascript',
        tags: 'apple',
        location: 'lagos'
      }).end(function (err, res) {
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('date is required');
        done();
      });
    });

    it('should fail on POST with incomplete payload (date)', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/meetups').set('x-auth-token', token).send({
        topic: 'javascript',
        tags: 'apple',
        happeningOn: '1234',
        location: 'lagos'
      }).end(function (err, res) {
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('date must be in this format: yyyy-mm-dd or yyyy/mm/dd');
        done();
      });
    });

    it('should fail on POST with empty payload', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/meetups').set('x-auth-token', token).send({}).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(400);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('topic is required');
        done();
      });
    });
  });

  describe('DELETE', function () {
    it('should return 401 when no token is provided', function (done) {
      (0, _supertest2.default)(_index2.default).delete('/api/v1/meetups/1').end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(401);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('No Token provided');
        done();
      });
    });

    it('should return 401 when no wrong is provided', function (done) {
      (0, _supertest2.default)(_index2.default).delete('/api/v1/meetups/1').set('x-auth-token', wrongtoken).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(422);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('jwt malformed');
        done();
      });
    });
  });

  describe('UPDATE', function () {
    it('should return 401 when no token is provided', function (done) {
      (0, _supertest2.default)(_index2.default).put('/api/v1/meetups/1').end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(401);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('No Token provided');
        done();
      });
    });

    it('should return 401 when no wrong is provided', function (done) {
      (0, _supertest2.default)(_index2.default).put('/api/v1/meetups/1').set('x-auth-token', wrongtoken).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(422);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('jwt malformed');
        done();
      });
    });
  });
});