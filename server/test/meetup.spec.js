/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import request from 'supertest';

import { expect } from 'chai';

import jwt from 'jsonwebtoken';

import moment from 'moment';

import server from '../index';

const wrongtoken = 'wrong token';
const token = jwt.sign({ userID: 1 }, process.env.SECRET);
const notAdminToken = jwt.sign({ userID: 2 }, process.env.SECRET);

describe('Meetups', () => {
  describe('POST /meetups', () => {
    it('should return status code 201 on successful post of meetups', (done) => {
      request(server)
        .post('/api/v1/meetups')
        .set('x-auth-token', token)
        .send({
          topic: 'everlasting meetup Party',
          location: 'lagos',
          happeningOn: moment(new Date('12-12-2990')),
          tags: ['new', 'meetup', 'record'],
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'data');
          done();
        });
    });

    it('should return status code 401 unauthorized when user is not an adin', (done) => {
      request(server)
        .post('/api/v1/meetups')
        .set('x-auth-token', notAdminToken)
        .send({
          topic: 'everlasting meetup',
          location: 'usa',
          happeningOn: moment(new Date('12-12-1012')),
          tags: ['new', 'meetup', 'yea'],
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('Sorry, only Admin can perform this action');
          done();
        });
    });

    it('should return status code 422 with incomplete payload (tags)', (done) => {
      request(server)
        .post('/api/v1/meetups')
        .set('x-auth-token', token)
        .send({
          topic: 'Progress Party',
          location: 'lagos',
          happeningOn: '2020-04-04',
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('tags is required');
          done();
        });
    });

    it('should return status code 422 when tags length is less than 3(tags)', (done) => {
      request(server)
        .post('/api/v1/meetups')
        .set('x-auth-token', token)
        .send({
          topic: 'Progress Party',
          location: 'lagos',
          happeningOn: '2020-04-04',
          tags: ['bukunmi'],
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('tags must contain 3 items');
          done();
        });
    });

    it('should fail on POST with incomplete payload(location)', (done) => {
      request(server)
        .post('/api/v1/meetups')
        .set('x-auth-token', token)
        .send({
          topic: 'Bootcamp is a day to reminnisce a good call',
          tags: 'apple',
          happeningOn: '23-12-2019',
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('location is required');
          done();
        });
    });

    it('should fail on POST with date absent from payload (date)', (done) => {
      request(server)
        .post('/api/v1/meetups')
        .set('x-auth-token', token)
        .send({
          topic: 'javascript is an happy language',
          tags: ['apple', 'happy', 'language'],
          location: 'lagos',
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('date must be in this format: yyyy-mm-dd or yyyy/mm/dd is required');
          done();
        });
    });

    it('should fail on POST with invalid payload (date)', (done) => {
      request(server)
        .post('/api/v1/meetups')
        .set('x-auth-token', token)
        .send({
          topic: 'javascript is a beautiful language every cares to know',
          tags: ['apple', 'app', 'growth'],
          happeningOn: '108-100-1900',
          location: 'lagos',
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('date must be in this format: yyyy-mm-dd or yyyy/mm/dd must be a valid ISO 8601 date');
          done();
        });
    });

    it('should fail on POST with empty payload', (done) => {
      request(server)
        .post('/api/v1/meetups')
        .set('x-auth-token', token)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('topic is required');
          done();
        });
    });
  });

  describe('GET /meetups/', () => {
    it('should return status code 200 on successful fetch of all meetups', (done) => {
      request(server)
        .get('/api/v1/meetups')
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'data');
          done();
        });
    });
  });

  describe('GET /meetups/meetup-id', () => {
    it('should return status code 200 on successful fetch of specific meetups', (done) => {
      request(server)
        .get('/api/v1/meetups/1')
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'data');
          done();
        });
    });
  });

  describe('GET /meetups/upcoming', () => {
    it('should return status code 200 on successful fetch of upcoming meetups', (done) => {
      request(server)
        .get('/api/v1/meetups/upcoming')
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'data');
          done();
        });
    });
  });

  describe('UPDATE', () => {
    it('should return 200 on successful update of meetup', (done) => {
      request(server)
        .put('/api/v1/meetups/1')
        .set('x-auth-token', token)
        .send({
          topic: 'new meetup title',
          happeningOn: moment(new Date()),
          location: 'Abuja',
          tags: ['new', 'meetup', 'title'],
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'data');
          done();
        });
    });

    it('should return 401 unauhorized when user is not an admin', (done) => {
      request(server)
        .put('/api/v1/meetups/1')
        .set('x-auth-token', notAdminToken)
        .send({
          topic: 'new meetup title',
          happeningOn: moment(new Date()),
          location: 'Abuja',
          tags: ['new', 'meetup', 'title'],
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('Sorry, only Admin can perform this action');
          done();
        });
    });
  });

  describe('DELETE', () => {
    it('should return 404 status code when meetup to be deleted does not exist', (done) => {
      request(server)
        .delete('/api/v1/meetups/10')
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('This meetup is no longer available');
          done();
        });
    });

    it('should return 200 status code on successful deletion of a meetup record', (done) => {
      request(server)
        .delete('/api/v1/meetups/3')
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Meetup successfully deleted');
          done();
        });
    });

    it('should return 401 status code(unauthorized) if user is not an admin', (done) => {
      request(server)
        .delete('/api/v1/meetups/1')
        .set('x-auth-token', notAdminToken)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('Sorry, only Admin can perform this action');
          done();
        });
    });
  });
});
