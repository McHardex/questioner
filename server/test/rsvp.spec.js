/* eslint-disable no-unused-vars */
import request from 'supertest';

import { expect } from 'chai';

import jwt from 'jsonwebtoken';

import server from '../index';

const invalidString = 'wrong token';
const token = jwt.sign({ userID: 1 }, process.env.SECRET);
const wrongToken = `${token}as67asas`;

describe('RSVPs', () => {
  describe('GET /rsvps', () => {
    it('should return status code 401 when no token is passed', (done) => {
      request(server)
        .get('/api/v1/rsvps/1')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('No Token provided');
          done();
        });
    });

    it('should return status code 422 when string is passed as token', (done) => {
      request(server)
        .get('/api/v1/rsvps/3')
        .set('x-auth-token', invalidString)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('jwt malformed');
          done();
        });
    });

    it('should return status code 422 when invalid token is passed', (done) => {
      request(server)
        .get('/api/v1/rsvps/3')
        .set('x-auth-token', wrongToken)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('invalid signature');
          done();
        });
    });

    it('should return status code 404 when unable to fetch rsvps', (done) => {
      request(server)
        .get('/api/v1/rsvps/3')
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('no rsvp record found');
          done();
        });
    });
  });

  describe('POST /meetups/:meetup-id/rsvps', () => {
    const payload = {
      response: 'yes',
    };
    it('should return status code 401 when no token is passed', (done) => {
      request(server)
        .post('/api/v1/meetups/1/rsvps')
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('No Token provided');
          done();
        });
    });

    it('should return status code 422 when string is passed as token', (done) => {
      request(server)
        .post('/api/v1/meetups/1/rsvps')
        .set('x-auth-token', invalidString)
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('jwt malformed');
          done();
        });
    });

    it('should return status code 422 when invalid token is passed', (done) => {
      request(server)
        .post('/api/v1/meetups/1/rsvps')
        .set('x-auth-token', wrongToken)
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('invalid signature');
          done();
        });
    });

    it('should return 201 status code when successfully posted', (done) => {
      request(server)
        .post('/api/v1/meetups/1/rsvps')
        .set('x-auth-token', token)
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          done();
        });
    });

    it('should return 409 status response already recorded', (done) => {
      request(server)
        .post('/api/v1/meetups/1/rsvps')
        .set('x-auth-token', token)
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('You can only respond once');
          done();
        });
    });

    it('should return status code 200 on successful fetch of rsvps', (done) => {
      request(server)
        .get('/api/v1/rsvps/1')
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});
