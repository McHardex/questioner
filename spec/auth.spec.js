/* eslint-disable no-unused-vars */

const request = require('request');

const baseUrl = 'http://localhost:3000/api/v1/auth';

describe('User Api Exists', () => {
  describe('POST /auth/signup', () => {
    it('should return status code 200', (done) => {
      request.post(`${baseUrl}/signup`, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('should fail on POST', (done) => {
      request.post(`${baseUrl}/signup`, { json: true, body: {} }, (error, response) => {
        expect(response.statusCode).toEqual(404);
        done();
      });
    });

    it('API Response should be valid json', (done) => {
      request.post(`${baseUrl}/signup`, (error, response, body) => {
        expect(() => {
          JSON.parse(body);
        }).not.toThrow();
        done();
      });
    });
  });

  describe('POST /auth/signin', () => {
    it('should return status code 200', (done) => {
      request.post(`${baseUrl}/signin`, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('should fail on POST', (done) => {
      request.post(`${baseUrl}/signin`, { json: true, body: {} }, (error, response) => {
        expect(response.statusCode).toEqual(404);
        done();
      });
    });

    it('API Response should be valid json', (done) => {
      request.post(`${baseUrl}/signin`, (error, response, body) => {
        expect(() => {
          JSON.parse(body);
        }).not.toThrow();
        done();
      });
    });
  });
});
