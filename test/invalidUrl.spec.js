/* eslint-disable no-unused-vars */
import request from 'supertest';

import { expect } from 'chai';

import server from '../index';

describe('INVALID ROUTE', () => {
  it('should return 404 error when invalid route is visited', (done) => {
    request(server)
      .get('/api/v1/thisUrlDoesNotExist')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Route not found, please enter a valid url');
        done();
      });
  });
});
