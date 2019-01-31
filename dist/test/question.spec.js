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

describe('QUESTIONS', function () {
  describe('GET /questions', function () {
    it('should return status code 401 when no token is passed', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/v1/questions').end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(401);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('No Token provided');
        done();
      });
    });

    it('should return status code 422 when string is passed as token', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/v1/questions').set('x-auth-token', invalidString).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(422);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('jwt malformed');
        done();
      });
    });

    it('should return status code 422 when invalid token is passed', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/v1/questions').set('x-auth-token', wrongToken).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(422);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('invalid signature');
        done();
      });
    });

    it('should return status code 404 when no question exists', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/v1/questions').set('x-auth-token', token).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(404);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('No meetup record found');
        done();
      });
    });
  });

  describe('POST /questions', function () {
    it('should return status code 401 when no token is passed', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/questions').end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(401);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('No Token provided');
        done();
      });
    });

    it('should return status code 422 when string is passed as token', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/questions').set('x-auth-token', invalidString).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(422);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('jwt malformed');
        done();
      });
    });

    it('should return status code 422 when invalid token is passed', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/questions').set('x-auth-token', wrongToken).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(422);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('invalid signature');
        done();
      });
    });

    it('should return status code 201 on successful post of question', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/questions').set('x-auth-token', token).send({
        title: 'how can I grow as a developer?',
        body: 'Apply to Andela. The best tech company in Africa',
        meetup_id: 1
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(201);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'data');
        (0, _chai.expect)(res.body.data[0].title).to.equal('how can I grow as a developer?');
        done();
      });
    });

    it('should return status code 400 with incomplete payload(meetup id)', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/questions').set('x-auth-token', token).send({
        title: 'how can I grow as a developer?',
        body: 'Apply to Andela. The best tech company in Africa'
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(400);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('meetup id is required');
        done();
      });
    });

    it('should return status code 400 with incomplete payload(title)', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/questions').set('x-auth-token', token).send({
        body: 'Apply to Andela. The best tech company in Africa',
        meetup_id: 1
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(400);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('title is required');
        done();
      });
    });

    it('should return status code 400 with incomplete payload(body)', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/questions').set('x-auth-token', token).send({
        title: 'how can I grow as a developer?',
        meetup_id: 1
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(400);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('body is required');
        done();
      });
    });

    it('should return status code 400 with title length less than 10', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/questions').set('x-auth-token', token).send({
        title: 'how can?',
        body: 'Apply to Andela. The best tech company in Africa',
        meetup_id: 1
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(400);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('title length must be greater than 10');
        done();
      });
    });

    it('should return status code 400 with body length less than 30', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/questions').set('x-auth-token', token).send({
        title: 'how can I grow as a developer?',
        body: 'Apply to Andela.',
        meetup_id: 1
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(400);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'error');
        (0, _chai.expect)(res.body.error).to.equal('body length must be greater than 30');
        done();
      });
    });

    it('should return status code 200 on successful fetch of all question', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/v1/questions').set('x-auth-token', token).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(200);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.all.keys('status', 'data');
        (0, _chai.expect)(res.body.data[0].title).to.equal('how can I grow as a developer?');
        done();
      });
    });
  });
});