/* eslint-disable no-unused-vars */

const request = require('request');

const baseUrl = 'http://localhost:3000/api/v1/user';

describe('User Api Exists', () => {
  describe('POST /user', () => {
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
      request.post(`${baseUrl}`, (error, response, body) => {
        expect(() => {
          JSON.parse(body);
        }).not.toThrow();
        done();
      });
    });
  });
});
