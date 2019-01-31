'use strict';

var _chai = require('chai');

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_ENV = 'test'; /* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable invalid-number */


var signupPayload = {
  firstname: 'omoluwa',
  lastname: 'david',
  othername: 'omokeye',
  username: 'codehallow',
  email: 'mchardex1995@gmail.com',
  phoneNumber: '2334455667788',
  password: 'mchardex'
};

var loginDetails = {
  email: 'mchardex1995@gmail.com',
  password: 'mchardex'
};

describe('The User route', function () {
  describe('The Signup route', function () {
    it('Should return 400 when firsname is not present', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/auth/signup').send({
        lastname: 'david',
        othername: 'omokeye',
        username: 'mchardex',
        email: 'adepnte@gmail.com',
        phoneNumber: '0816011601644',
        password: 'meluwe'
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(400);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.error).to.equal('Firstname is required');
        done();
      });
    });

    it('Should return 400 when lastname is not present', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/auth/signup').send({
        firstname: 'david',
        othername: 'omokeye',
        username: 'mchardex',
        email: 'adepntefgf@gmail.com',
        phoneNumber: '0816011601644',
        password: 'meluwe'
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(400);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.error).to.equal('Lastname is required');
        done();
      });
    });

    it('Should return 400 when othername is not present', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/auth/signup').send({
        firstname: 'david',
        lastname: 'david',
        username: 'mchardex',
        email: 'adepncc@gmail.com',
        phoneNumber: '0816011601644',
        password: 'meluwe'
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(400);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.error).to.equal('Othername is required');
        done();
      });
    });

    it('Should return 400 when username is not present', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/auth/signup').send({
        firstname: 'david',
        lastname: 'david',
        othername: 'jognson',
        email: 'adepnbbte@gmail.com',
        phoneNumber: '8160116091644',
        password: 'meluwe'
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(400);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.error).to.equal('Username is required');
        done();
      });
    });

    it('Should return 400 when phone number is not present', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/auth/signup').send({
        firstname: 'david',
        lastname: 'david',
        username: 'machardex',
        email: 'boikingh@gmail.com',
        othername: 'jognson',
        registered: '2019-01-15',
        password: 'meluwe'
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(400);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.error).to.equal('Phone number is required');
        done();
      });
    });
    it('Should return 400 when password is not present', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/auth/signup').send({
        firstname: 'david',
        lastname: 'david',
        othername: 'jognson',
        username: 'iyinola',
        email: 'buufd@getMaxListeners.com',
        phoneNumber: '8160116016449',
        registered: '2019-01-15'
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(400);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.error).to.equal('Password is required');
        done();
      });
    });

    it('Should return 400 for invalid email', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/auth/signup').send({
        firstname: 'Adebisi',
        lastname: 'Oluwabukunmi',
        othername: 'Joseph',
        username: 'mchardex',
        email: 'olaw',
        phoneNumber: '08160601644',
        password: 'password'
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(400);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.error).to.equal('Please enter a valid email address');
        done();
      });
    });

    it('Should return 201 for successfully creating user', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/auth/signup').send(signupPayload).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(201);
        (0, _chai.expect)(res.body).to.be.an('object');
        done();
      });
    });

    it('Should return 409 for existing user', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/auth/signup').send(signupPayload).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(409);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.error).to.equal('User exists, check your credentials');
        done();
      });
    });
  });

  describe('The Login route', function () {
    it('Should return 400 for missing required fields', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/auth/login').send({}).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(400);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.error).to.equal('Please ensure to fill all input field');
        done();
      });
    });

    it('Should return 400 for incorrect email format', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/auth/login').send({
        email: 'mountaom',
        password: 'h0ttestt'
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(400);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.error).to.equal('Please enter a valid email address');
        done();
      });
    });

    it('Should return 400 for incorrect password', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/auth/login').send({
        email: 'mchardex1995@gmail.com',
        password: 'ghy'
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(400);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.error).to.equal('Invalid credentials');
        done();
      });
    });

    it('Should return 404 if the user doesn\'t exist', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/auth/login').send({
        email: 'lmomozza@gmail.com',
        password: '123456lklk'
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(404);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.error).to.equal('No such user in our database');
        done();
      });
    });

    it('Should return 200 for successful login', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/auth/login').send(loginDetails).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(200);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.data[0]).to.have.keys('token', 'user');
        done();
      });
    });
  });
});