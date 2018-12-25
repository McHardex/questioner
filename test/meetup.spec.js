/* eslint-disable no-unused-vars */
import request from 'supertest';

import { expect } from 'chai';

import server from '../index';

describe('Meetups List Api Exists', () => {
  describe('GET /meetups', () => {
    it('should return status code 200 on successful fetching', (done) => {
      request(server)
        .get('/api/v1/meetups')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });

  describe('GET /meetups/upcoming', () => {
    it('should return status code 200 for successful fetching of upcoming meetups', (done) => {
      request(server)
        .get('/api/v1/meetups/upcoming')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });

  describe('GET /meetups/meetup-id', () => {
    let id = 0;
    it('should return status code 200 for request with valid id', (done) => {
      request(server)
        .get(`/api/v1/meetups/${id}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });

    it('should return status code 400 for request wuth invalid id', (done) => {
      id = 'aaa';
      request(server)
        .get(`/api/v1/meetups/${id}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });
  });

  describe('POST /meetups', () => {
    let params;

    it('should return status code 201 on successful post', (done) => {
      params = {
        topic: 'js',
        location: 'lagos',
        happeningOn: new Date(),
        tags: 'apple',
      };
      request(server)
        .post('/api/v1/meetups')
        .send(params)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          done();
        });
    });

    it('should fail on POST with incomplete payload', (done) => {
      params = {
        topic: 'js',
        location: 'lagos',
        happeningOn: new Date(),
      };
      request(server)
        .post('/api/v1/meetups')
        .send(params)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });

    it('should fail on POST with incomplete payload', (done) => {
      params = {
        topic: 'js',
        tags: 'apple',
        happeningOn: new Date(),
      };
      request(server)
        .post('/api/v1/meetups')
        .send(params)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });

    it('should fail on POST with incomplete payload', (done) => {
      params = {
        topic: 'js',
        tags: 'apple',
        location: 'lagos',
      };
      request(server)
        .post('/api/v1/meetups')
        .send(params)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });

    it('should fail on POST with empty payload', (done) => {
      params = {};
      request(server)
        .post('/api/v1/meetups')
        .send(params)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });
  });
});
