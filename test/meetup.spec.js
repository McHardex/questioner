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
          expect(res.body.data[0])
            .to.have.keys('id', 'topic', 'location', 'happeningon', 'createdon', 'tags');
          expect(res.body.data[0].topic).to.equal('coders brings live');
          expect(res.body.data[0].location).to.equal('Abuja');
          expect(res.body.data[0].happeningOn).to.equal('12-04-2016');
          expect(res.body.data[0].tags).to.deep.equal(['codes', 'live']);
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
          expect(res.body.data[0])
            .to.have.all.keys('id', 'topic', 'location', 'happeningon', 'createdon', 'tags');
          expect(res.body.data[0].topic).to.equal('coders brings live');
          expect(res.body.data[0].location).to.equal('Abuja');
          expect(res.body.data[0].happeningOn).to.equal('12-04-2016');
          expect(res.body.data[0].tags).to.deep.equal(['codes', 'live']);
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
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(`Unable to fetch meetup with id of ${id}`);
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
          expect(res.body.data[0])
            .to.have.all.keys('id', 'topic', 'location', 'happeningon', 'createdon', 'tags');
          done();
        });
    });
  });

  describe('POST /meetups', () => {
    let params;

    it('should return status code 201 on successful post', (done) => {
      params = {
        id: 1,
        topic: 'Binary trading',
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
          expect(res.body.data[0])
            .to.have.all.keys('id', 'topic', 'location', 'happeningOn', 'createdon', 'tags');
          expect(res.body.data[0].topic).to.equal('Binary trading');
          expect(res.body.data[0].location).to.equal('lagos');
          expect(res.body.data[0].happeningOn).to.equal('23-12-2020');
          expect(res.body.data[0].tags).to.deep.eql(['apple', 'coding', 'legend']);
          done();
        });
    });

    it('should fail on POST with incomplete payload', (done) => {
      params = {
        id: 1,
        topic: 'Progress Party',
        location: 'lagos',
        happeningOn: '22-04-2020',
      };
      request(server)
        .post('/api/v1/meetups')
        .send(params)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('tags is required');
          done();
        });
    });

    it('should return 409 status code if meetup already exists', (done) => {
      params = {
        topic: 'Binary trading',
        location: 'lagos',
        happeningOn: '22-04-2020',
        tags: ['coders', 'everyday', 'live'],
      };
      request(server)
        .post('/api/v1/meetups')
        .send(params)
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error)
            .to.equal('A meetup with this topic already exists. Please input another topic');
          done();
        });
    });

    it('should fail on POST with incomplete payload', (done) => {
      params = {
        topic: 'Bootcamp',
        tags: 'apple',
        happeningOn: '23-12-2019',
      };
      request(server)
        .post('/api/v1/meetups')
        .send(params)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('location is required');
          done();
        });
    });

    it('should fail on POST with incomplete payload', (done) => {
      params = {
        topic: 'javascript',
        tags: 'apple',
        location: 'lagos',
      };
      request(server)
        .post('/api/v1/meetups')
        .send(params)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('date is required');
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
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('topic is required');
          done();
        });
    });

    it('should fail on POST with topic length less than 5', (done) => {
      params = {
        topic: 'me',
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
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('topic length must be greater than 5');
          done();
        });
    });

    it('should fail on POST with location length less than 3', (done) => {
      params = {
        topic: 'community shield',
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
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('location length must be greater than 3');
          done();
        });
    });

    it('should fail on POST with tag length less than 3', (done) => {
      params = {
        topic: 'Accountability',
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
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('Please add a minimum of three(3) tags');
          done();
        });
    });

    it('should fail on POST with incorrect date input', (done) => {
      params = {
        topic: 'The green initiatives',
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
          expect(res.body).to.have.property('error');
          expect(res.body.error)
            .to.equal('happeningOn date must be in this format: mm-dd-yyy or mm/dd/yy');
          done();
        });
    });
  });
});
