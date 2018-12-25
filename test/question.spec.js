/* eslint-disable no-unused-vars */
import request from 'supertest';

import { expect } from 'chai';

import server from '../index';

describe('Question Api Exists', () => {
  describe('GET /questions', () => {
    it('should return status code 200 on successful questions fetching', (done) => {
      request(server)
        .get('/api/v1/questions')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
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
          done();
        });
    });

    it('should fail on POST with empty payload', (done) => {
      params = {};
      request(server)
        .post('/api/v1/questions')
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
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
          done();
        });
    });
  });
});
