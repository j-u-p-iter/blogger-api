import request from 'superagent';
import HTTPStatus from 'http-status';

import { dic } from 'dic';
import { runApp } from '../..';

import { 
  signUpUser, 
  sendRequestWithToken, 
  generateString, 
  generateEmail,
} from '../../utils/testsUtils';

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
        name: generateString(),
        email: generateEmail(),
        password: 12345,
      }, {
        name: generateString(),
        email: generateEmail(),
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
        name: generateString(),
        email: generateEmail(),
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
        name: generateString(),
        email: generateEmail(),
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
              name: generateString(), 
              email: generateEmail(), 
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
      beforeEach(async () => {
        ({ accessToken } = await signUpUser({ 
          extractResponse,
          url: authUrls.signUp(), 
          user: { 
            name: generateString(), 
            email: generateEmail(), 
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
            name: generateString(),
            email: 'invalidEmail',
            password: '12345',
          };
        });

        it('returns correct error', async () => {
          const url = usersUrls.post(); 
          const { 
            status, 
            body: { success, error }, 
          } = await extractResponse(sendRequestWithToken(request.post(url).send(userToCreate), accessToken));

          expect(status).toBe(HTTPStatus.BAD_REQUEST);
          expect(success).toBe(false);
          expect(error).toBeDefined();
        });
      });
    });
  });

  describe('put to api/v1/users/:userId', () => {
    let dataToUpdate;
    let userToUpdate;

    beforeAll(() => {
      const dataToUpdate = { name: generateString(), email: generateEmail() }
    });

    beforeEach(async () => {
      userToUpdate = {
        name: generateString(),
        email: generateEmail(),
        password: 12345,
      };

      const { _id } = await userModel.create(userToUpdate); 

      userToUpdate = {
        ...userToUpdate,
        _id,
      };
    });

    describe('when updator of the user is invalid', () => {
      describe('when updator of the user is not signed in', () => {
        it('returns correct error', async () => {
          const url = usersUrls.patch(userToUpdate._id);
          const { 
            status, 
            body: { 
              error, 
              success, 
            },
          } = await extractResponse(request.put(url).send(dataToUpdate));

          expect(status).toBe(HTTPStatus.FORBIDDEN);
          expect(success).toBe(false);
          expect(error).toBe('Accessable only for authenticated users');
        });
      });

      describe('when updator of the user is not an admin', () => {
        let accessToken;
        
        beforeAll(async () => {
          ({ accessToken } = await signUpUser({ 
            extractResponse,
            url: authUrls.signUp(), 
            user: { 
              name: generateString(), 
              email: generateEmail(), 
              password: '12345',
            } 
          }));
        });

        it('returns correct error', async () => {
          const url = usersUrls.patch(userToUpdate._id);
          const { 
            status, 
            body: { 
              error, 
              success, 
              message,
            },
          } = await extractResponse(sendRequestWithToken(request.put(url).send(dataToUpdate), accessToken));

          expect(status).toBe(HTTPStatus.FORBIDDEN);
          expect(success).toBe(false);
          expect(error).toBe('Accessable only admins');
        });
      });
    });

    describe('when updator of user is valid', () => {
      let accessToken;
      
      beforeEach(async () => {
        ({ accessToken } = await signUpUser({ 
          extractResponse,
          url: authUrls.signUp(), 
          user: { 
            name: generateString(), 
            email: generateEmail(), 
            password: '12345',
            role: 'admin',
          } 
        }));
      });

      describe('with correct user id', () => {
        it('updates user properly', async () => {
          const url = usersUrls.patch(userToUpdate._id);
          const dataToUpdate = { name: generateString(), email: generateEmail() }
          const { 
            status, 
            body: { 
              user,
              success, 
              message,
            } 
          } = await extractResponse(sendRequestWithToken(request.put(url).send(dataToUpdate), accessToken));

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
          } = await extractResponse(sendRequestWithToken(request.put(url).send(dataToUpdate), accessToken));

          expect(status).toBe(HTTPStatus.BAD_REQUEST);
          expect(body.success).toBe(false);
        });
      });
    });
  });

  describe('delete to api/v1/users/:userId', () => {
    let userToDelete;

    beforeAll(async () => {
      userToDelete = {
        name: generateString(),
        email: generateEmail(),
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
