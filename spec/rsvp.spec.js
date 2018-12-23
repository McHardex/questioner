/* eslint-disable no-unused-vars */

const request = require('request');

let meetupId = 1;
const baseUrl = `http://localhost:3000/api/v1/meetups/${meetupId}/rsvps`;

describe('RSVP List Api Exists', () => {
  describe('GET /rsvps', () => {
    it('should return status code 200 on successful fetching', (done) => {
      request.get('http://localhost:3000/api/v1/rsvps', (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('API Response should be valid json', (done) => {
      request.get('http://localhost:3000/api/v1/rsvps', (error, response, body) => {
        expect(() => {
          JSON.parse(body);
        }).not.toThrow();
        done();
      });
    });
  });

  describe('POST /meetups/:meetup-id/rsvps', () => {
    let params = null;

    beforeEach(() => {
      params = {
        url: baseUrl,
        form: {
          status: 'yes',
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
      request.post(params, (error, response, body) => {
        expect(() => {
          JSON.parse(body);
        }).not.toThrow();
        done();
      });
    });

    it('should fail on POST', (done) => {
      request.post(baseUrl, { json: true, body: {} }, (error, response, body) => {
        expect(response.statusCode).toEqual(400);
        done();
      });
    });

    it('should return 400 with invalid meetup-id', (done) => {
      meetupId = 'aaa';
      const url = `http://localhost:3000/api/v1/meetups/${meetupId}/rsvps`;
      request.post({ url, form: { status: 'yes' } }, (error, response, body) => {
        expect(response.statusCode).toEqual(400);
        done();
      });
    });
  });
});
