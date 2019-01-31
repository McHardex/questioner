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


var invalidString = 'wrong token';
var token = _jsonwebtoken2.default.sign({ userID: 1 }, process.env.SECRET);
var wrongToken = token + 'as67asas';

describe('RSVPs', function () {
  describe('GET /rsvps', function () {
    it('should return status code 401 when no token is passed', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/v1/rsvps').end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(401);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('No Token provided');
        done();
      });
    });

    it('should return status code 422 when string is passed as token', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/v1/rsvps').set('x-auth-token', invalidString).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(422);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('jwt malformed');
        done();
      });
    });

    it('should return status code 422 when invalid token is passed', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/v1/rsvps').set('x-auth-token', wrongToken).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(422);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('invalid signature');
        done();
      });
    });

    it('should return status code 404 when unable to fetch rsvps', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/v1/rsvps').set('x-auth-token', token).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(404);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('No rsvp record found');
        done();
      });
    });
  });

  describe('POST /meetups/:meetup-id/rsvps', function () {
    var payload = {
      response: 'yes'
    };
    it('should return status code 401 when no token is passed', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/meetups/1/rsvps').send(payload).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(401);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('No Token provided');
        done();
      });
    });

    it('should return status code 422 when string is passed as token', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/meetups/1/rsvps').set('x-auth-token', invalidString).send(payload).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(422);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('jwt malformed');
        done();
      });
    });

    it('should return status code 422 when invalid token is passed', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/meetups/1/rsvps').set('x-auth-token', wrongToken).send(payload).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(422);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('invalid signature');
        done();
      });
    });

    it('should return 201 status code when successfully posted', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/meetups/1/rsvps').set('x-auth-token', token).send(payload).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(201);
        (0, _chai.expect)(res.body).to.be.an('object');
        done();
      });
    });

    it('should return 409 status response already recorded', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/meetups/1/rsvps').set('x-auth-token', token).send(payload).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(409);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('You can only respond once');
        done();
      });
    });

    it('should return status code 201 when on succesful fetching of all rsvps', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/v1/rsvps').set('x-auth-token', token).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(201);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'data');
        (0, _chai.expect)(res.body.data[0]).to.have.all.keys('id', 'meetup_id', 'user_id', 'response');
        (0, _chai.expect)(res.body.data[0].response).to.equal('yes');
        done();
      });
    });
  });
});