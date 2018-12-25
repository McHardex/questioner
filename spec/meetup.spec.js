/* eslint-disable no-unused-vars */

const request = require('request');

const baseUrl = 'http://localhost:3000/api/v1/meetups';

describe('Meetups List Api Exists', () => {
  describe('GET /meetups', () => {
    it('should return status code 200 on successful fetching', (done) => {
      request.get(`${baseUrl}`, (error, response, body) => {
        expect(response.statusCode).toBe(200);
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

  describe('GET /meetups/upcoming', () => {
    it('should return status code 200', (done) => {
      request.get(`${baseUrl}/upcoming`, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('API Response should be valid json', (done) => {
      request.get(`${baseUrl}/upcoming`, (error, response, body) => {
        expect(() => {
          JSON.parse(body);
        }).not.toThrow();
        done();
      });
    });
  });

  describe('GET /meetups/meetup-id', () => {
    let id = 0;
    it('should return status code 200 on successful fetching', (done) => {
      request.get(`${baseUrl}/${id}`, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('should return status code 400 for invalid id', (done) => {
      id = 'aaa';
      request.get(`${baseUrl}/${id}`, (error, response, body) => {
        expect(response.statusCode).toBe(400);
        done();
      });
    });

    it('API Response should be valid json', (done) => {
      request.get(`${baseUrl}/${id}`, (error, response, body) => {
        expect(() => {
          JSON.parse(body);
        }).not.toThrow();
        done();
      });
    });
  });

  describe('POST /meetups', () => {
    let params = null;

    beforeEach(() => {
      params = {
        url: baseUrl,
        form: {
          topic: 'js',
          location: 'lagos',
          happeningOn: new Date(),
          tags: 'apple',
        },
      };
    });

    it('should return status code 201 on successful post', (done) => {
      request.post(params, (error, response, body) => {
        expect(response.statusCode).toBe(201);
        done();
      });
    });

    it('API Response should be valid json', (done) => {
      request.post(baseUrl, (error, response, body) => {
        expect(() => {
          JSON.parse(body);
        }).not.toThrow();
        done();
      });
    });

    it('should fail on POST', (done) => {
      request.post(baseUrl, { json: true, body: {} }, (error, response) => {
        expect(response.statusCode).toEqual(400);
        done();
      });
    });
  });
});
