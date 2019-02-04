/* eslint-disable no-unused-vars */
import request from 'supertest';

import { expect } from 'chai';

import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

import server from '../index';

dotenv.config();

const token = jwt.sign({ userID: 2 }, process.env.SECRET);

describe('COMMENTS', () => {
  describe('POST /comments', () => {
    it('should return status code 201 on successful post of comments on questions', (done) => {
      request(server)
        .post('/api/v1/comments')
        .set('x-auth-token', token)
        .send({
          user_id: 1,
          comment: 'this is a new comment',
          question_id: 1
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });

    it('should return status code 404 with incomplete payload(comment)', (done) => {
      request(server)
        .post('/api/v1/comments')
        .set('x-auth-token', token)
        .send({
          user_id: 1,
          question_id: 1
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('comment is required');
          done();
        });
    });

    it('should return status code 404 with incomplete payload(comment)', (done) => {
      request(server)
        .post('/api/v1/comments')
        .set('x-auth-token', token)
        .send({
          user_id: 1,
          comment: 'this is another comment',
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('question id is required');
          done();
        });
    });
  });

  describe('GET /comments', () => {
    it('should return status code 200 on successful fetch of all comments', (done) => {
      request(server)
        .get('/api/v1/comments')
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  describe('GET /comments/user_id', () => {
    it('should return status code 200 on successful fetch of specific comments by user', (done) => {
      request(server)
        .get('/api/v1/comments/2')
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});
