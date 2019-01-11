/* eslint-disable no-unused-vars */
import request from 'supertest';

import { expect } from 'chai';

import server from '../index';

describe('Questions', () => {
  describe('GET /questions', () => {
    it('should return status code 200 on successful questions fetching', (done) => {
      request(server)
        .get('/api/v1/questions')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data');
          expect(res.body.data[0])
            .to.have.keys('userId', 'meetupId', 'createdOn', 'title', 'body', 'votes');
          expect(res.body.data[0].title).to.equal('Javascript crash course?');
          expect(res.body.data[0].body)
            .to.equal('Javascript is the new source of joy today and forever');
          done();
        });
    });
  });

  describe('POST /questions', () => {
    let params;

    it('should return status code 201 on successful question post', (done) => {
      params = {
        title: 'new apple always come with a new set of rules',
        body: 'new apple always come with a new set of rules new new set of rules',
      };
      request(server)
        .post('/api/v1/questions')
        .send(params)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data');
          expect(res.body.data[0].title).to.equal('new apple always come with a new set of rules');
          expect(res.body.data[0].body)
            .to.equal('new apple always come with a new set of rules new new set of rules');
          expect(res.body.data[0])
            .to.have.all.keys('userId', 'meetupId', 'createdOn', 'title', 'body', 'votes');
          done();
        });
    });

    it('should return status code 400 with title length greater than 10', (done) => {
      params = {
        title: 'new',
        body: 'new apple always new apple always come with a new set of rules',
      };
      request(server)
        .post('/api/v1/questions')
        .send(params)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('title length must be greater than 10');
          done();
        });
    });

    it('should return status code 400 with body length greater than 30', (done) => {
      params = {
        title: 'new apple comes with new',
        body: 'new apple',
      };
      request(server)
        .post('/api/v1/questions')
        .send(params)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('body length must be greater than 30');
          done();
        });
    });

    it('should return 400 with incomplete payload', (done) => {
      params = {
        title: 'new apple always come with a new set of rules',
      };
      request(server)
        .post('/api/v1/questions')
        .send(params)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('body is required');
          done();
        });
    });

    it('should fail on POST with empty payload', (done) => {
      params = {};
      request(server)
        .post('/api/v1/questions')
        .send(params)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('title is required');
          done();
        });
    });
  });

  describe('PATCH /questions/question_id/upvote', () => {
    it('should return status code 200 upvote with valid id', (done) => {
      request(server)
        .patch('/api/v1/questions/0/upvote')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data[0]).to.have.all.keys('meetupId', 'title', 'body', 'votes');
          done();
        });
    });

    it('should return status code 422 with invalid id', (done) => {
      request(server)
        .patch('/api/v1/questions/aaa/upvote')
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('no question with id of aaa found');
          done();
        });
    });
  });

  describe('PATCH /questions/question_id/downvote', () => {
    it('should return status code 200 for downvote with valid id', (done) => {
      request(server)
        .patch('/api/v1/questions/0/downvote')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data');
          expect(res.body.data[0]).to.have.all.keys('meetupId', 'title', 'body', 'votes');
          done();
        });
    });

    it('should return status code 422 with invalid id', (done) => {
      request(server)
        .patch('/api/v1/questions/aaa/downvote')
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('no question with id of aaa found');
          done();
        });
    });
  });
});
