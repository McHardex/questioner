/* eslint-disable no-unused-vars */

const request = require('request');

const baseUrl = 'http://localhost:3000/api/v1/meetups';

// const Meetup = {
//   status: '',
//   data: [
//     {
//       id: 2,
//       title: '',
//       location: '',
//       happeningOn: '',
//       tags: [''],
//     },
//   ],
// };


describe('Meetups List Api Exists', () => {
  describe('GET /meetups', () => {
    it('should return status code 200', (done) => {
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
    it('should return status code 200', (done) => {
      request.get(`${baseUrl}/2`, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('API Response should be valid json', (done) => {
      request.get(`${baseUrl}/2`, (error, response, body) => {
        expect(() => {
          JSON.parse(body);
        }).not.toThrow();
        done();
      });
    });
  });

  describe('POST /meetups', () => {
    it('should return status code 200', (done) => {
      request.post(baseUrl, (error, response, body) => {
        expect(response.statusCode).toBe(200);
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
        expect(response.statusCode).toEqual(404);
        done();
      });
    });
  });

  describe('POST /meetups/meetup-id/rsvps', () => {
    it('should respond to meetup RSVP', (done) => {
      request.post(`${baseUrl}/1/rsvps`, { json: true, body: {} }, (error, response) => {
        expect(response.statusCode).toEqual(404);
        done();
      });
    });
  });
});
