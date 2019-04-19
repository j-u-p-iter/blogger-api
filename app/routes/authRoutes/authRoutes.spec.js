import request from 'superagent';
import HTTPStatus from 'http-status';

import { dic } from 'dic';
import{ runApp } from '../..';

describe('authRoutes', () => {
  let authUrls;
  let extractResponse;
  let userModel;

  beforeAll((done) => {
    runApp(() => {
      userModel = dic.resolve('userModel');
      authUrls = dic.resolve('authUrls');
      extractResponse = dic.resolve('utils').extractResponse;

      done();
    });
  });

  afterEach((done) => {
    userModel.deleteAll(done);
  });

  afterAll(() => {
    dic.resolve('httpServer').close();
    dic.resolve('database').close();
  });

  describe('get to api/v1/sign-up', () => {
    it('creates user and sign in him', async () => {
      const userToSignUp = {
        name: 'someName',
        email: 'some@email.com',
        password: 12345,
      };

      const url = authUrls.signUp();

      const { status, body: { user, accessToken, success, message } } = await extractResponse(request.post(url, userToSignUp)); 

      expect(success).toBe(true);
      expect(user.name).toBe(userToSignUp.name);
      expect(user.email).toBe(userToSignUp.email);
      expect(user.password).not.toBe(userToSignUp.password);
      expect(message).toBe('Sign Up with success');
      expect(accessToken).toBeDefined();
    });
  });
});
