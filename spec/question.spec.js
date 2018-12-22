/* eslint-disable no-unused-vars */

const request = require('request');

const baseUrl = 'http://localhost:3000/api/v1/questions';

describe('Question Api Exists', () => {
  describe('POST /questions', () => {
    it('should return status code 200', (done) => {
      request.post(`${baseUrl}`, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('should fail on POST', (done) => {
      request.post(`${baseUrl}`, { json: true, body: {} }, (error, response) => {
        expect(response.statusCode).toEqual(404);
        done();
      });
    });

    it('API Response should be valid json', (done) => {
      request.get(`${baseUrl}`, (error, response, body) => {
        expect(() => {
          JSON.parse(body);
        }).not.toThrow();
        done();
      });
    });
  });

  describe('PATCH /questions/question-id/upvote', () => {
    it('should return status code 200', (done) => {
      request.patch(`${baseUrl}/1/upvote`, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('should fail on patch', (done) => {
      request.patch(`${baseUrl}/1/upvote`, { json: true, body: {} }, (error, response) => {
        expect(response.statusCode).toEqual(404);
        done();
      });
    });

    it('API Response should be valid json', (done) => {
      request.patch(`${baseUrl}/1/upvote`, (error, response, body) => {
        expect(() => {
          JSON.parse(body);
        }).not.toThrow();
        done();
      });
    });
  });

  describe('PATCH /questions/question-id/downvote', () => {
    it('should return status code 200', (done) => {
      request.patch(`${baseUrl}/1/downvote`, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('should fail on patch', (done) => {
      request.patch(`${baseUrl}/1/downvote`, { json: true, body: {} }, (error, response) => {
        expect(response.statusCode).toEqual(404);
        done();
      });
    });

    it('API Response should be valid json', (done) => {
      request.patch(`${baseUrl}/1/downvote`, (error, response, body) => {
        expect(() => {
          JSON.parse(body);
        }).not.toThrow();
        done();
      });
    });
  });
});
