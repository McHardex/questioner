/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import request from 'supertest';

import { expect } from 'chai';

import jwt from 'jsonwebtoken';

import moment from 'moment';

import server from '../index';


require('dotenv').config();

const wrongtoken = 'wrong token';
const token = jwt.sign({ userID: 1 }, process.env.SECRET);

describe('Meetups', () => {
  let params;
  params = {
    topic: 'challenge trading hour',
    location: 'lagos',
    happeningOn: '2018-12-22',
    tags: ['apple', 'coding', 'legend'],
  };

  describe.skip('GET /meetups', () => {
    describe('GET /meetups/', () => {
      it('should return status code 401 when no token is provided', (done) => {
        request(server)
          .get('/api/v1/meetups')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.all.keys('status', 'error');
            expect(res.body.error).to.equal('No Token provided');
          });
      });

      it('should return status code 422(unprocessable entity) when an invalid token is passed', (done) => {
        request(server)
          .set('x-auth-token', wrongtoken)
          .get('/api/v1/meetups')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.all.keys('status', 'error');
            expect(res.body.error).to.equal('invalid signature');
          });
      });

      it('should return status 404 when there is no meetup record', (done) => {
        request(server)
          .set('x-auth-token', token)
          .get('/api/v1/meetups')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.all.keys('status', 'error');
            expect(res.body.error).to.equal('invalid signature');
          });
      });
    });

    describe('GET /meetups/meetup-id', () => {
      it('should return status code 401 when no token is provided', (done) => {
        request(server)
          .get('/api/v1/meetups/1')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.all.keys('status', 'error');
            expect(res.body.error).to.equal('No Token provided');
          });
      });

      it('should return status code 422(unprocessable entity) when an invalid token is passed', (done) => {
        request(server)
          .set('x-auth-token', wrongtoken)
          .get('/api/v1/meetups/1')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.all.keys('status', 'error');
            expect(res.body.error).to.equal('invalid signature');
          });
      });

      it('should return status code 404 with invalid meetup id', (done) => {
        request(server)
          .set('x-auth-token', token)
          .get('/api/v1/meetups/1')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.all.keys('status', 'error');
            expect(res.body.error).to.equal('Meetup record does not exist');
            done();
          });
      });

      it('should return status code 404 with invalid meetup id syntax', (done) => {
        request(server)
          .set('x-auth-token', token)
          .get('/api/v1/meetups/aaa')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.all.keys('status', 'error');
            expect(res.body.error).to.equal('Meetup record does not exist');
            done();
          });
      });
    });

    describe('GET /meetups/upcoming', () => {
      it('should return status code 404 when there is no upcoming', (done) => {
        request(server)
          .get('/api/v1/meetups/upcoming')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.all.keys('status', 'error');
            expect(res.body.error).to.equal('There is no upcoming meetups');
            done();
          });
      });
    });
  });

  describe.skip('POST /meetups', () => {
    xit('should return status code 400 when no token is passed', (done) => {
      request(server)
        .post('/api/v1/meetups')
        .send(params)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('No Token provided');
          done();
        });
    });

    xit('should return status code 400 when invalid token is passed', (done) => {
      request(server)
        .post('/api/v1/meetups')
        .set('x-auth-token', wrongtoken)
        .send(params)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('jwt malformed');
          done();
        });
    });

    xit('should return status code 409 on when meetup exists', (done) => {
      request(server)
        .post('/api/v1/meetups')
        .set('x-auth-token', token)
        .send(params)
        .end((err, res) => {
          console.log(res.body);
          expect(res.status).to.equal(409);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('Meetup already exists, try creating a new one');
          done();
        });
    });

    xit('should fail on POST with incomplete payload (tags)', (done) => {
      params = {
        topic: 'Progress Party',
        location: 'lagos',
        happeningOn: '22-04-2020',
      };
      request(server)
        .post('/api/v1/meetups')
        .set('x-auth-token', token)
        .send(params)
        .end((err, res) => {
          // console.log(res.body);
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('tags is required');
          done();
        });
    });

    xit('should fail on POST with incomplete payload(location)', (done) => {
      params = {
        topic: 'Bootcamp',
        tags: 'apple',
        happeningOn: '23-12-2019',
      };
      request(server)
        .post('/api/v1/meetups')
        .set('x-auth-token', token)
        .send(params)
        .end((err, res) => {
          // console.log(res.body);
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('location is required');
          done();
        });
    });

    xit('should fail on POST with incomplete payload (date)', (done) => {
      params = {
        topic: 'javascript',
        tags: 'apple',
        location: 'lagos',
      };
      request(server)
        .post('/api/v1/meetups')
        .set('x-auth-token', token)
        .send(params)
        .end((err, res) => {
          console.log(res.body);
          // expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('date is required');
          done();
        });
    });

    xit('should fail on POST with empty payload', (done) => {
      params = {};
      request(server)
        .post('/api/v1/meetups')
        .set('x-auth-token', token)
        .send(params)
        .end((err, res) => {
          // console.log(res.body);
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('topic is required');
          done();
        });
    });

    xit('should fail on POST with topic length less than 5', (done) => {
      params = {
        topic: 'me',
        location: 'lagos',
        happeningOn: '22-04-2020',
        tags: 'apple',
      };
      request(server)
        .post('/api/v1/meetups')
        .set('x-auth-token', token)
        .send(params)
        .end((err, res) => {
          // console.log(res.body);
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('topic length must be greater than 5');
          done();
        });
    });

    xit('should fail on POST with location length less than 3', (done) => {
      params = {
        topic: 'community shield',
        location: 'la',
        happeningOn: '22-04-2020',
        tags: 'apple',
      };
      request(server)
        .post('/api/v1/meetups')
        .set('x-auth-token', token)
        .send(params)
        .end((err, res) => {
          // console.log(res.body, 'c');
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('location length must be greater than 3');
          done();
        });
    });

    xit('should fail on POST with tag length less than 3', (done) => {
      params = {
        topic: 'Accountability',
        location: 'los angeles',
        happeningOn: '22-04-2020',
        tags: 'ap',
      };
      request(server)
        .post('/api/v1/meetups')
        .set('x-auth-token', token)
        .send(params)
        .end((err, res) => {
          // console.log(res.body, 'b');
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('Please add a minimum of three(3) tags');
          done();
        });
    });
  });
});
