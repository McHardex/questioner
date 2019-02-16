/* eslint-disable no-unused-vars */
import request from 'supertest';

import { expect } from 'chai';

import jwt from 'jsonwebtoken';

import server from '../index';

const invalidString = 'wrong token';
const token = jwt.sign({ userID: 1 }, process.env.SECRET);
const wrongToken = `${token}as67asas`;

describe('QUESTIONS', () => {
  describe('GET /questions', () => {
    it('should return status code 401 when no token is passed', (done) => {
      request(server)
        .get('/api/v1/questions')
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
        .get('/api/v1/questions')
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
        .get('/api/v1/questions')
        .set('x-auth-token', wrongToken)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('invalid signature');
          done();
        });
    });
  });

  describe('POST /questions', () => {
    it('should return status code 401 when no token is passed', (done) => {
      request(server)
        .post('/api/v1/questions')
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
        .post('/api/v1/questions')
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
        .post('/api/v1/questions')
        .set('x-auth-token', wrongToken)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('invalid signature');
          done();
        });
    });

    it('should return status code 201 on successful post of question', (done) => {
      request(server)
        .post('/api/v1/questions')
        .set('x-auth-token', token)
        .send({
          title: 'how can I grow as a developer?',
          body: 'Apply to Andela. The best tech company in Africa',
          meetup_id: 1,
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'data');
          expect(res.body.data[0].title).to.equal('how can I grow as a developer?');
          done();
        });
    });

    it('should return status code 422 with incomplete payload(meetup id)', (done) => {
      request(server)
        .post('/api/v1/questions')
        .set('x-auth-token', token)
        .send({
          title: 'how can I grow as a developer?',
          body: 'Apply to Andela. The best tech company in Africa',
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('meetup_id is required');
          done();
        });
    });

    it('should return status code 422 with incomplete payload(title)', (done) => {
      request(server)
        .post('/api/v1/questions')
        .set('x-auth-token', token)
        .send({
          body: 'Apply to Andela. The best tech company in Africa',
          meetup_id: 1,
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('title is required');
          done();
        });
    });

    it('should return status code 422 with incomplete payload(body)', (done) => {
      request(server)
        .post('/api/v1/questions')
        .set('x-auth-token', token)
        .send({
          title: 'how can I grow as a developer?',
          meetup_id: 1,
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('body is required');
          done();
        });
    });

    it('should return status code 422 with title length less than 10', (done) => {
      request(server)
        .post('/api/v1/questions')
        .set('x-auth-token', token)
        .send({
          title: 'how can?',
          body: 'Apply to Andela. The best tech company in Africa',
          meetup_id: 1,
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('title length must be at least 10 characters long');
          done();
        });
    });

    it('should return status code 422 with body length less than 20', (done) => {
      request(server)
        .post('/api/v1/questions')
        .set('x-auth-token', token)
        .send({
          title: 'how can I grow as a developer?',
          body: 'Apply to Andela.',
          meetup_id: 1,
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('body length must be at least 20 characters long');
          done();
        });
    });

    it('should return status code 200 on successful fetch of all question', (done) => {
      request(server)
        .get('/api/v1/questions')
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'data');
          expect(res.body.data[0].title).to.equal('what have you learnt so far?');
          done();
        });
    });
  });

  describe('PATCH /questions/:question_id/upvote', () => {
    it('should return status code 200 on successful upvote of question', (done) => {
      request(server)
        .patch('/api/v1/questions/2/upvote')
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'data');
          expect(res.body.data[0].title).to.equal('how can I grow as a developer?');
          expect(res.body.data[0].body).to.equal('Apply to Andela. The best tech company in Africa');
          expect(res.body.data[0].votes).to.equal(1);
          done();
        });
    });

    it('should return status code 200 on successful downvote of question on second patch request', (done) => {
      request(server)
        .patch('/api/v1/questions/2/upvote')
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'data');
          expect(res.body.data[0].title).to.equal('how can I grow as a developer?');
          expect(res.body.data[0].body).to.equal('Apply to Andela. The best tech company in Africa');
          expect(res.body.data[0].votes).to.equal(0);
          done();
        });
    });

    it('should return status code 404 when invalid question_id is sent with upvote endpoint', (done) => {
      request(server)
        .patch('/api/v1/questions/5/upvote')
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('status', 'error');
          expect(res.body.error).to.equal('no votes by user on this question');
          done();
        });
    });
  });
});
