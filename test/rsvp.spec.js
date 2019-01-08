/* eslint-disable no-unused-vars */
import request from 'supertest';

import { expect } from 'chai';

import server from '../index';

describe('RSVPs', () => {
  describe('GET /rsvps', () => {
    it('should return status code 200 on successful fetching of all rsvps', (done) => {
      request(server)
        .get('/api/v1/rsvps')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('POST /meetups/:meetup-id/rsvps', () => {
    let payload = { status: 'yes' };
    it('should return status code 201 on successful post to endpoint', (done) => {
      request(server)
        .post('/api/v1/meetups/1/rsvps')
        .send(payload)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          done();
        });
    });

    it('should return 400 status code when empty payload is passed', (done) => {
      payload = {};
      request(server)
        .post('/api/v1/meetups/1/rsvps')
        .send(payload)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Please let us know if you will be coming');
          done();
        });
    });

    it('should return 404 status with invalid meetupId', (done) => {
      request(server)
        .post('/api/v1/meetups/invalidId/rsvps')
        .send(payload)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('meetup does not exist');
          done();
        });
    });
  });
});
