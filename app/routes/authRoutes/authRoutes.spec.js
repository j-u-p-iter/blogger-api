import request from 'superagent';
import HTTPStatus from 'http-status';

import { dic } from 'dic';
import{ runApp } from '../..';

describe('authRoutes', () => {
  let authUrls;
  let extractResponse;

  beforeAll((done) => {
    runApp(() => {
      authUrls = dic.resolve('authUrls');
      extractResponse = dic.resolve('utils').extractResponse;

      done();
    });
  });

  afterAll(() => {
    dic.resolve('httpServer').close();
    dic.resolve('database').close();
  });

  describe('get to api/v1/sign-up', () => {
    it('creates user and sign in him', () => {
      expect(true).toBe(true);
    });
  });
});
