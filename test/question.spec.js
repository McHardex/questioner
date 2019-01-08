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
          done();
        });
    });
  });

  describe('POST /questions', () => {
    let params;

    it('should return status code 201 on successful question post', (done) => {
      params = {
        title: 'new apple',
        body: 'apple',
      };
      request(server)
        .post('/api/v1/questions')
        .send(params)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          done();
        });
    });

    it('should return 400 with incomplete payload', (done) => {
      params = {
        title: 'new apple',
      };
      request(server)
        .post('/api/v1/questions')
        .send(params)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('body is required');
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
          expect(res.body.message).to.equal('title is required');
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
          done();
        });
    });

    it('should return status code 422 with invalid id', (done) => {
      request(server)
        .patch('/api/v1/questions/aaa/upvote')
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('no question with id of aaa found');
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
          done();
        });
    });

    it('should return status code 422 with invalid id', (done) => {
      request(server)
        .patch('/api/v1/questions/aaa/downvote')
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('no question with id of aaa found');
          done();
        });
    });
  });
});
