import request from 'superagent';
import HTTPStatus from 'http-status';

import { dic } from 'dic';
import { runApp } from '../..';

import { signUpUser, sendRequestWithToken } from '../../utils/testsUtils';

describe('usersRoutes', () => {
  let userModel;
  let usersUrls;
  let extractResponse;
  let authUrls;

  beforeAll(() => {
    userModel = dic.resolve('userModel');
    usersUrls = dic.resolve('usersUrls');
    authUrls = dic.resolve('authUrls');
    extractResponse = dic.resolve('utils').extractResponse;
  });

  describe('get to api/v1/users', () => {
    let insertingUsers;

    beforeAll(async () => {
      insertingUsers = [{
        name: 'someName',
        email: 'some@email.com',
        password: 12345,
      }, {
        name: 'oneMoreName',
        email: 'onemore@email.com',
        password: 1234567,
        role: 'admin',
      }];

      await userModel.insertMany(insertingUsers);
    });

    it('returns all users', async () => {
      const url = usersUrls.get();
      const { status, body: { users, success, message } } = await extractResponse(request.get(url));

      expect(users.length).toBe(insertingUsers.length);
      expect(success).toBe(true);
      expect(status).toBe(HTTPStatus.OK);
      expect(message).toBe('Retrieve users with success');

      // assertions for first user
      const resultFirstUser = users[0];
      const expectedFirstUser = insertingUsers[0];

      expect(resultFirstUser.email).toBe(expectedFirstUser.email);
      expect(resultFirstUser.name).toBe(expectedFirstUser.name);
      expect(resultFirstUser.role).toBe('user');
      expect(resultFirstUser.password).not.toBeDefined();
      expect(resultFirstUser._id).not.toBeDefined();
      expect(resultFirstUser.id).toBeDefined();

      // assertions for sedond user
      const resultSecondUser = users[1];
      const expectedSecondUser = insertingUsers[1];

      expect(resultSecondUser.email).toBe(expectedSecondUser.email);
      expect(resultSecondUser.name).toBe(expectedSecondUser.name);
      expect(resultSecondUser.role).toBe('admin');
      expect(resultSecondUser.password).not.toBeDefined();
      expect(resultFirstUser._id).not.toBeDefined();
      expect(resultFirstUser.id).toBeDefined();
    });
  });

  describe('get to api/v1/users/:userId', () => {
    let userToAdd;
    let addedUser;

    beforeAll(async () => {
      userToAdd = {
        name: 'someName',
        email: 'some@email.com',
        password: 12345,
      };

      addedUser = await userModel.create(userToAdd);
    });

    it('returns user correctly', async () => {
      const url = usersUrls.getOne(addedUser._id);

      const { status, body: { user, success, message } } = await extractResponse(request.get(url));

      expect(status).toBe(HTTPStatus.OK);
      expect(success).toBe(true);

      expect(user.name).toBe(userToAdd.name);
      expect(user.email).toBe(userToAdd.email);
      expect(user.role).toBe('user');
      expect(user.password).not.toBeDefined();
      expect(user._id).not.toBeDefined();
      expect(user.id).toBeDefined();
    });

    describe('with incorrect user id', () => {
      it('returns correct error', async () => {
        const url = usersUrls.getOne(5);
        const { status, body } = await extractResponse(request.get(url));

        expect(status).toBe(HTTPStatus.BAD_REQUEST);
        expect(body.success).toBe(false);
        expect(body.error).toBeDefined();
      });
    });
  });
  
  describe('post to api/v1/users', () => {
    let userToCreate;
    let accessToken;

    beforeAll(async () => {
      userToCreate = {
        name: 'oneMoreName',
        email: 'onemore@email.com',
        password: '12345',
      };
    });
    
    describe('when creator of the user is invalid', () => {
      describe('when creator of the user is not signed in', () => {
        it('returns correct error', async () => {
          const url = usersUrls.post();
          const { 
            status, 
            body: { 
              error, 
              success, 
            },
          } = await extractResponse(request.post(url).send(userToCreate));

          expect(status).toBe(HTTPStatus.FORBIDDEN);
          expect(success).toBe(false);
          expect(error).toBe('Accessable only for authenticated users');
        });
      });

      describe('when creator of the user is not an admin', () => {
        let accessToken;
        
        beforeAll(async () => {
          ({ accessToken } = await signUpUser({ 
            extractResponse,
            url: authUrls.signUp(), 
            user: { 
              name: 'somename', 
              email: 'some@email.com', 
              password: '12345',
            } 
          }));
        });

        it('returns correct error', async () => {
          const url = usersUrls.post();
          const { 
            status, 
            body: { 
              error, 
              success, 
              message,
            },
          } = await extractResponse(sendRequestWithToken(request.post(url).send(userToCreate), accessToken));

          expect(status).toBe(HTTPStatus.FORBIDDEN);
          expect(success).toBe(false);
          expect(error).toBe('Accessable only admins');
        });
      });
    });

    describe('when creator of the user is valid', () => {
      beforeAll(async () => {
        ({ accessToken } = await signUpUser({ 
          extractResponse,
          url: authUrls.signUp(), 
          user: { 
            name: 'somename', 
            email: 'some@email.com', 
            password: '12345',
            role: 'admin',
          } 
        }));
      });

      describe('with correct data', () => {
        it('creates user properly', async () => {
          const url = usersUrls.post();
          const { 
            status, 
            body: { 
              user, 
              success, 
              message,
            } 
          } = await extractResponse(sendRequestWithToken(request.post(url).send(userToCreate), accessToken));

          expect(status).toBe(HTTPStatus.CREATED);
          expect(success).toBe(true);
          expect(message).toBe('Create user with success');

          expect(user.email).toEqual(userToCreate.email);
          expect(user.name).toEqual(userToCreate.name);
          expect(user.password).not.toBeDefined();
          expect(user._id).not.toBeDefined();
          expect(user.id).toBeDefined();
        });
      });

      describe('with incorrect data', () => {
        let userToCreate;

        beforeAll(async () => {
        userToCreate = {
            name: 'someName',
            email: 'invalidEmail',
            password: '12345',
          };
        });

        it('returns correct error', async () => {
          const url = usersUrls.post(); 
          const { status, body: error } = await extractResponse(request.post(url).send(userToCreate));

          expect(status).toBe(HTTPStatus.BAD_REQUEST);
          expect(error.success).toBe(false);
          expect(error.error).toBeDefined();
        });
      });
    });
  });

  describe('put to api/v1/users/:userId', () => {
    let userToUpdate;

    beforeAll(async () => {
      userToUpdate = {
        name: 'someName',
        email: 'some@email.com',
        password: 12345,
      };

      const { _id } = await userModel.create(userToUpdate); 

      userToUpdate = {
        ...userToUpdate,
        _id,
      };
    });

    describe('with correct user id', () => {
      it('updates user properly', async () => {
        const url = usersUrls.patch(userToUpdate._id);
        const dataToUpdate = { name: 'someNewName', email: 'new@email.com' }
        const { 
          status, 
          body: { 
            user,
            success, 
            message,
          } 
        } = await extractResponse(request.put(url).send(dataToUpdate));

        expect(status).toBe(HTTPStatus.OK);
        expect(success).toBe(true);
        expect(message).toBe('Update user with success')
        expect(user.name).toBe(dataToUpdate.name);
        expect(user.email).toBe(dataToUpdate.email);
        expect(user.password).not.toBeDefined();
        expect(user._id).not.toBeDefined();
        expect(user.id).toBeDefined();
      });
    });

    describe('with incorrect id', () => {
      it('returns correct error', async () => {
        const url = usersUrls.patch(5); 
        const { 
          status, 
          body, 
        } = await extractResponse(request.put(url).send({ name: 'someNewName', email: 'new@email.com' }
));

        expect(status).toBe(HTTPStatus.BAD_REQUEST);
        expect(body.success).toBe(false);
      });
    });
  });

  describe('delete to api/v1/users/:userId', () => {
    let userToDelete;

    beforeAll(async () => {
      userToDelete = {
        name: 'someName',
        email: 'some@email.com',
        password: 12345,
      };

      const { _id } = await userModel.create(userToDelete);

      userToDelete = {
        ...userToDelete,
        _id,
      };
    });

    describe('with correct id', () => {
      it('deletes user properly', async () => {
        const url = usersUrls.delete(userToDelete._id);
        const { 
          status, 
          body: { 
            success, 
            message,
          } 
        } = await request.delete(url);

        expect(status).toBe(HTTPStatus.OK);
        expect(success).toBe(true);
        expect(message).toBe('User deleted with success');
      });
    });

    describe('with incorrect id', () => {
      it('returns correct error', async () => {
        const url = usersUrls.delete(5); 
        const { status, body: { success, error } } = await extractResponse(request.delete(url));

        expect(status).toBe(HTTPStatus.BAD_REQUEST);
        expect(success).toBe(false);
      });
    });
  });
});

// refactor delete and getOne routes specs according to update route spec.
