/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import request from 'supertest';

import { expect } from 'chai';

import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

import server from '../index';

dotenv.config();

const wrongtoken = 'wrong token';
const token = jwt.sign({ userID: 1 }, process.env.SECRET);

describe('Meetups', () => {
  describe('GET /meetups', () => {
    describe('GET /meetups/', () => {
      it('should return status code 401 when no token is provided', (done) => {
        request(server)
          .get('/api/v1/meetups')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.all.keys('status', 'error');
            expect(res.body.error).to.equal('No Token provided');
            done();
          });
      });

      it('should return status code 422(unprocessable entity) when an invalid token is passed', (done) => {
        request(server)
          .get('/api/v1/meetups')
          .set('x-auth-token', wrongtoken)
          .end((err, res) => {
            console.log(res.body);
            expect(res.status).to.equal(422);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.all.keys('status', 'error');
            expect(res.body.error).to.equal('jwt malformed');
            done();
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
            done();
          });
      });

      it('should return status code 422(unprocessable entity) when an invalid token is passed', (done) => {
        request(server)
          .get('/api/v1/meetups/1')
          .set('x-auth-token', wrongtoken)
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.all.keys('status', 'error');
            expect(res.body.error).to.equal('jwt malformed');
            done();
          });
      });

      it('should return status code 404 with invalid meetup id', (done) => {
        request(server)
          .get('/api/v1/meetups/aaaa')
          .set('x-auth-token', token)
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
      it('should return status code 401 when no token is passed there is no upcoming', (done) => {
        request(server)
          .get('/api/v1/meetups/upcoming')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.all.keys('status', 'error');
            expect(res.body.error).to.equal('No Token provided');
            done();
          });
      });

      it('should return status code 404 when no token is passed there is no upcoming meetup', (done) => {
        request(server)
          .get('/api/v1/meetups/upcoming')
          .set('x-auth-token', token)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.equal('there are no upcoming meetups');
            done();
          });
      });
    });
  });

  describe('POST /meetups', () => {
    it('should return status code 401 when no token is passed', (done) => {
      request(server)
        .post('/api/v1/meetups')
        .send({
          topic: 'challenge trading hour',
          location: 'lagos',
          happeningOn: '2018-12-22',
          tags: ['apple', 'coding', 'legend'],
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('No Token provided');
          done();
        });
    });

    it('should return status code 422 when invalid token is passed', (done) => {
      request(server)
        .post('/api/v1/meetups')
        .set('x-auth-token', wrongtoken)
        .send({
          topic: 'challenge trading hour',
          location: 'lagos',
          happeningOn: '2018-12-22',
          tags: ['apple', 'coding', 'legend'],
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('jwt malformed');
          done();
        });
    });

    it('should return status code 400 with incomplete payload (tags)', (done) => {
      request(server)
        .post('/api/v1/meetups')
        .set('x-auth-token', token)
        .send({
          topic: 'Progress Party',
          location: 'lagos',
          happeningOn: '22-04-2020',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('tags is required');
          done();
        });
    });

    it('should return status code 400 when tags length is less than 3(tags)', (done) => {
      request(server)
        .post('/api/v1/meetups')
        .set('x-auth-token', token)
        .send({
          topic: 'Progress Party',
          location: 'lagos',
          happeningOn: '22-04-2020',
          tags: ['bukunmi'],
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('Please add a minimum of three(3) tags');
          done();
        });
    });

    it('should fail on POST with incomplete payload(location)', (done) => {
      request(server)
        .post('/api/v1/meetups')
        .set('x-auth-token', token)
        .send({
          topic: 'Bootcamp',
          tags: 'apple',
          happeningOn: '23-12-2019',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('location is required');
          done();
        });
    });

    it('should fail on POST with incomplete payload(location)', (done) => {
      request(server)
        .post('/api/v1/meetups')
        .set('x-auth-token', token)
        .send({
          topic: 'Bootcamp',
          location: 'a',
          tags: 'apple',
          happeningOn: '23-12-2019',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('location length must be greater than 3');
          done();
        });
    });

    it('should fail on POST with incomplete payload (date)', (done) => {
      request(server)
        .post('/api/v1/meetups')
        .set('x-auth-token', token)
        .send({
          topic: 'javascript',
          tags: 'apple',
          location: 'lagos',
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('date is required');
          done();
        });
    });

    it('should fail on POST with incomplete payload (date)', (done) => {
      request(server)
        .post('/api/v1/meetups')
        .set('x-auth-token', token)
        .send({
          topic: 'javascript',
          tags: 'apple',
          happeningOn: '1234',
          location: 'lagos',
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('date must be in this format: mm-dd-yyy or mm/dd/yy');
          done();
        });
    });

    it('should fail on POST with empty payload', (done) => {
      request(server)
        .post('/api/v1/meetups')
        .set('x-auth-token', token)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('topic is required');
          done();
        });
    });
  });

  describe('DELETE', () => {
    it('should return 401 when no token is provided', (done) => {
      request(server)
        .delete('/api/v1/meetups/1')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('No Token provided');
          done();
        });
    });

    it('should return 401 when no wrong is provided', (done) => {
      request(server)
        .delete('/api/v1/meetups/1')
        .set('x-auth-token', wrongtoken)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('jwt malformed');
          done();
        });
    });
  });

  describe('UPDATE', () => {
    it('should return 401 when no token is provided', (done) => {
      request(server)
        .put('/api/v1/meetups/1')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('No Token provided');
          done();
        });
    });

    it('should return 401 when no wrong is provided', (done) => {
      request(server)
        .put('/api/v1/meetups/1')
        .set('x-auth-token', wrongtoken)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('jwt malformed');
          done();
        });
    });
  });
});
