/* eslint-disable no-unused-vars */
import request from 'supertest';

import { expect } from 'chai';

import server from '../index';

describe('Meetups', () => {
  describe('GET /meetups', () => {
    it('should return status code 200 on successful fetching of all meetups', (done) => {
      request(server)
        .get('/api/v1/meetups')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data');
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
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data');
          expect(res.body.data.title).to.equal('coders brings live');
          expect(res.body.data.location).to.equal('Abuja');
          expect(res.body.data.happeningOn).to.equal('12-04-2016');
          expect(res.body.data.tags).to.deep.equal(['codes', 'live']);
          done();
        });
    });

    it('should return status code 400 for request with invalid id', (done) => {
      id = 'aaa';
      request(server)
        .get(`/api/v1/meetups/${id}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal(`Unable to fetch meetup with id of ${id}`);
          done();
        });
    });
  });

  describe('GET /meetups/upcoming', () => {
    it('should return status code 200 on successful fetching of upcoming meetups', (done) => {
      request(server)
        .get('/api/v1/meetups/upcoming')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data');
          done();
        });
    });
  });

  describe('POST /meetups', () => {
    let params;

    it('should return status code 201 on successful post', (done) => {
      params = {
        title: 'javascript',
        location: 'lagos',
        happeningOn: '23-12-2020',
        tags: ['apple', 'coding', 'legend'],
      };
      request(server)
        .post('/api/v1/meetups')
        .send(params)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data');
          expect(res.body.data.title).to.equal('javascript');
          expect(res.body.data.location).to.equal('lagos');
          expect(res.body.data.happeningOn).to.equal('23-12-2020');
          expect(res.body.data.tags).to.deep.eql(['apple', 'coding', 'legend']);
          done();
        });
    });

    it('should fail on POST with incomplete payload', (done) => {
      params = {
        title: 'javascript',
        location: 'lagos',
        happeningOn: '22-04-2020',
      };
      request(server)
        .post('/api/v1/meetups')
        .send(params)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('tags is required');
          done();
        });
    });

    it('should fail on POST with incomplete payload', (done) => {
      params = {
        title: 'javascript',
        tags: 'apple',
        happeningOn: '23-12-2019',
      };
      request(server)
        .post('/api/v1/meetups')
        .send(params)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('location is required');
          done();
        });
    });

    it('should fail on POST with incomplete payload', (done) => {
      params = {
        title: 'javascript',
        tags: 'apple',
        location: 'lagos',
      };
      request(server)
        .post('/api/v1/meetups')
        .send(params)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('date happeningOn is required');
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
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('title is required');
          done();
        });
    });

    it('should fail on POST with title length less than 5', (done) => {
      params = {
        title: 'me',
        location: 'lagos',
        happeningOn: '22-04-2020',
        tags: 'apple',
      };
      request(server)
        .post('/api/v1/meetups')
        .send(params)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('title length must be greater than 5');
          done();
        });
    });

    it('should fail on POST with location length less than 3', (done) => {
      params = {
        title: 'javascript',
        location: 'la',
        happeningOn: '22-04-2020',
        tags: 'apple',
      };
      request(server)
        .post('/api/v1/meetups')
        .send(params)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('location length must be greater than 3');
          done();
        });
    });

    it('should fail on POST with tag length less than 3', (done) => {
      params = {
        title: 'javascript',
        location: 'los angeles',
        happeningOn: '22-04-2020',
        tags: 'ap',
      };
      request(server)
        .post('/api/v1/meetups')
        .send(params)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('tags length must be greater than 3');
          done();
        });
    });

    it('should fail on POST with incorrect date input', (done) => {
      params = {
        title: 'javascript',
        location: 'los angeles',
        happeningOn: '2222-040-2020',
        tags: 'apple',
      };
      request(server)
        .post('/api/v1/meetups')
        .send(params)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('the date must be in this format: mm-dd-yyy');
          done();
        });
    });
  });
});
