/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable invalid-number */
import { expect } from 'chai';

import request from 'supertest';

import server from '../index';

const signupPayload = {
  firstname: 'omoluwa',
  lastname: 'david',
  othername: 'omokeye',
  username: 'codehallow',
  email: 'mchardex1995@gmail.com',
  phoneNumber: '2334455667788',
  password: 'mchardex',
};

const loginDetails = {
  email: 'mchardex1995@gmail.com',
  password: 'mchardex',
};

describe('The User route', () => {
  describe('The Signup route', () => {
    it('Should return 422 when firsname is not present', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send({
          lastname: 'david',
          othername: 'omokeye',
          username: 'mchardex',
          email: 'adepnte@gmail.com',
          phoneNumber: '0816011601644',
          password: 'meluwe',
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('firstname is required');
          done();
        });
    });

    it('Should return 422 when lastname is not present', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'david',
          othername: 'omokeye',
          username: 'mchardex',
          email: 'adepntefgf@gmail.com',
          phoneNumber: '0816011601644',
          password: 'meluwe',
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('lastname is required');
          done();
        });
    });

    it('Should return 422 when othername is not present', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'david',
          lastname: 'david',
          username: 'mchardex',
          email: 'adepncc@gmail.com',
          phoneNumber: '0816011601644',
          password: 'meluwe',
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('othername is required');
          done();
        });
    });

    it('Should return 422 when username is not present', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'david',
          lastname: 'david',
          othername: 'jognson',
          email: 'adepnbbte@gmail.com',
          phoneNumber: '8160116091644',
          password: 'meluwe',
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('username is required');
          done();
        });
    });

    it('Should return 422 when phone number is not present', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'david',
          lastname: 'david',
          username: 'machardex',
          email: 'boikingh@gmail.com',
          othername: 'jognson',
          registered: '2019-01-15',
          password: 'meluwe',
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('phoneNumber is required');
          done();
        });
    });
    it('Should return 422 when password is not present', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'david',
          lastname: 'david',
          othername: 'jognson',
          username: 'iyinola',
          email: 'buufd@getMaxListeners.com',
          phoneNumber: '8160116016449',
          registered: '2019-01-15',
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('password is required');
          done();
        });
    });

    it('Should return 422 for invalid email', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Adebisi',
          lastname: 'Oluwabukunmi',
          othername: 'Joseph',
          username: 'mchardex',
          email: 'olaw',
          phoneNumber: '08160601644',
          password: 'password',
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('email must be a valid email');
          done();
        });
    });

    it('Should return 201 for successfully creating user', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send(signupPayload)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          done();
        });
    });

    it('Should return 409 for existing user', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send(signupPayload)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('User exists, check your credentials');
          done();
        });
    });
  });

  describe('The Login route', () => {
    it('Should return 422 for missing required fields', (done) => {
      request(server)
        .post('/api/v1/auth/login')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('email is required');
          done();
        });
    });

    it('Should return 422 for incorrect email format', (done) => {
      request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'mountaom',
          password: 'h0ttestt',
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('email must be a valid email');
          done();
        });
    });

    it('Should return 400 for incorrect password', (done) => {
      request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'mchardex1995@gmail.com',
          password: 'ghy',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('Invalid credentials');
          done();
        });
    });

    it('Should return 404 if the user doesn\'t exist', (done) => {
      request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'lmomozza@gmail.com',
          password: '123456lklk',
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('No such user in our database');
          done();
        });
    });

    it('Should return 200 for successful login', (done) => {
      request(server)
        .post('/api/v1/auth/login')
        .send(loginDetails)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data[0]).to.have.keys('token', 'user');
          done();
        });
    });
  });
});
