/* eslint-disable no-unused-vars */
import request from 'supertest';

import { expect } from 'chai';

import server from '../index';

describe('Welcome', () => {
  describe('GET /', () => {
    it('should return status code 200 on success', (done) => {
      request(server)
        .get('/api/v1/welcome')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data');
          done();
        });
    });
  });
});
