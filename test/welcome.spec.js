/* eslint-disable no-unused-vars */
import request from 'supertest';

import { expect } from 'chai';

import server from '../index';

describe('Welcome page Api Exists', () => {
  describe('GET /', () => {
    it('should return status code 200 on success', (done) => {
      request(server)
        .get('/')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });
});
