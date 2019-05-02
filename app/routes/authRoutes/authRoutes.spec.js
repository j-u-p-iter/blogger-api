import request from 'superagent';
import HTTPStatus from 'http-status';

import { dic } from 'dic';
import{ runApp } from '../..';

describe('authRoutes', () => {
  let authUrls;
  let extractResponse;
  let userModel;

  beforeAll(() => {
    userModel = dic.resolve('userModel');
    authUrls = dic.resolve('authUrls');
    extractResponse = dic.resolve('utils').extractResponse;
  });

  describe('post to api/v1/sign-up', () => {
    describe('with correct data', () => {
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

    describe('with incorrect data', () => {
      it('returns correct error', async () => {
        const userToSignUp = {
          email: 'invalidEmail',
          password: 12345,
        };

        const url = authUrls.signUp();

        const { status, body: { success, error } } = await extractResponse(request.post(url, userToSignUp)); 

        expect(status).toBe(HTTPStatus.BAD_REQUEST);
        expect(success).toBe(false);
        expect(error).toBeDefined();
      });
    });
  });

  describe('post to api/v1/sign-in', () => {
    describe('with incorrect data', () => {
      describe('without email', () => {
        it('returns correct error', async () => {
          const userToSignIn = {
            password: 12345,
          };

          const url = authUrls.signIn();

          const { status, body: { error, success } } = await extractResponse(request.post(url, userToSignIn)); 

          expect(status).toBe(HTTPStatus.UNAUTHORIZED);
          expect(success).toBe(false);
          expect(error).toBe('Email is required');
        });
      });

      describe('without password', () => {
        it('returns correct error', async () => {
          const userToSignIn = {
            email: 'some@email.com',
          };

          const url = authUrls.signIn();

          const { status, body: { error, success } } = await extractResponse(request.post(url, userToSignIn)); 

          expect(status).toBe(HTTPStatus.UNAUTHORIZED);
          expect(success).toBe(false);
          expect(error).toBe('Password is required');
        });
      })

      describe('without user with valid credentials', () => {
        it('returns correct error', async () => {
          const userToSignIn = {
            email: 'nosuch@email.com',
            password: 12345
          };

          const url = authUrls.signIn();

          const { status, body: { error, success } } = await extractResponse(request.post(url, userToSignIn)); 

          expect(status).toBe(HTTPStatus.UNAUTHORIZED);
          expect(success).toBe(false);
          expect(error).toBe('No such user');
        });
      });

      describe('with incorrect password', () => {
        beforeAll(async (done) => {
          const userToSignUp = {
            name: 'someName',
            email: 'some@email.com',
            password: 1234567,
          };
          const signUpUrl = authUrls.signUp();

          await request.post(signUpUrl, userToSignUp); 

          done();
        });

        it('returns correct error', async () => {
          const userToSignIn = {
            email: 'some@email.com',
            password: 12345, 
          };

          const url = authUrls.signIn();
          const { status, body: { error, success } } = await extractResponse(request.post(url, userToSignIn)); 

          expect(success).toBe(false);
          expect(status).toBe(HTTPStatus.UNAUTHORIZED);
          expect(error).toBe('Invalid password');
        });
      });
    });

    describe('with correct data', () => {
      beforeAll(async (done) => {
        const userToSignUp = {
          name: 'someName',
          email: 'some@email.com',
          password: '1234567',
        };
        const signUpUrl = authUrls.signUp();

        await request.post(signUpUrl, userToSignUp); 

        done();
      });

      it('signs in properly', async () => {
        const userToSignIn = {
          email: 'some@email.com',
          password: '1234567', 
        };

        const url = authUrls.signIn();
        const { status, body: { user, accessToken, success, message } } = await extractResponse(request.post(url, userToSignIn)); 

        expect(status).toBe(HTTPStatus.OK);
        expect(success).toBe(true);
        expect(message).toBe('Sign In with success');
        expect(accessToken).toBeDefined();
        expect(user.email).toBe(userToSignIn.email);
        expect(user.password).not.toBeDefined();
      })
    });
  });
});
