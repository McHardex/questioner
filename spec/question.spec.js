/* eslint-disable no-unused-vars */

const request = require('request');

const baseUrl = 'http://localhost:3000/api/v1/questions';

describe('Question Api Exists', () => {
  let params = null;

  beforeEach(() => {
    params = {
      url: baseUrl,
      form: {
        title: 'new apple',
        body: 'apple',
      },
    };
  });

  describe('GET /questions', () => {
    it('should return status code 200', (done) => {
      request.get(baseUrl, (error, response, body) => {
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
  });

  describe('POST /questions', () => {
    it('should return status code 201', (done) => {
      request.post(params, (error, response, body) => {
        expect(response.statusCode).toBe(201);
        done();
      });
    });

    it('should fail on POST', (done) => {
      request.post(baseUrl, { json: true, body: {} }, (error, response, body) => {
        expect(response.statusCode).toEqual(400);
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
  });

  describe('PATCH /questions/question_id/upvote', () => {
    it('should return status code 200', (done) => {
      request.patch(`${baseUrl}/0/upvote`, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('API Response should be valid json', (done) => {
      request.patch(`${baseUrl}/0/upvote`, (error, response, body) => {
        expect(() => {
          JSON.parse(body);
        }).not.toThrow();
        done();
      });
    });
  });

  // describe('PATCH /questions/question-id/downvote', () => {
  //   it('should return status code 200', (done) => {
  //     request.patch(`${baseUrl}/1/downvote`, (error, response, body) => {
  //       expect(response.statusCode).toBe(200);
  //       done();
  //     });
  //   });

  //   it('should fail on patch', (done) => {
  //     request.patch(`${baseUrl}/1/downvote`, { json: true, body: {} }, (error, response) => {
  //       expect(response.statusCode).toEqual(404);
  //       done();
  //     });
  //   });

  //   it('API Response should be valid json', (done) => {
  //     request.patch(`${baseUrl}/1/downvote`, (error, response, body) => {
  //       expect(() => {
  //         JSON.parse(body);
  //       }).not.toThrow();
  //       done();
  //     });
  //   });
  // });
});
