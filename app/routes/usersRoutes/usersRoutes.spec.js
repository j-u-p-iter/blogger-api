import request from 'superagent';
import HTTPStatus from 'http-status';
import to from 'await-to-js';
import { makeUrl } from '@j.u.p.iter/node-utils';

import { dic } from 'dic';
import { runApp } from '../..';

describe('usersRoutes', () => {
  let userModel;
  let SERVER_PORT;
  let SERVER_HOST;
  let usersUrls;
  let extractResponse;

  beforeAll((done) => {
    runApp(() => {
      userModel = dic.resolve('userModel');
      usersUrls = dic.resolve('usersUrls');
      extractResponse = dic.resolve('utils').extractResponse;

      ({ SERVER_PORT, SERVER_HOST } = dic.resolve('configs'));

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
      expect(resultFirstUser.password).toBeDefined();

      // assertions for sedond user
      const resultSecondUser = users[1];
      const expectedSecondUser = insertingUsers[1];

      expect(resultSecondUser.email).toBe(expectedSecondUser.email);
      expect(resultSecondUser.name).toBe(expectedSecondUser.name);
      expect(resultSecondUser.role).toBe('admin');
      expect(resultSecondUser.password).toBeDefined();
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
      expect(user.password).toBeDefined();
    });
  });
  
  describe('post to api/v1/users', () => {
    let userToCreate;

    beforeAll(async () => {
      userToCreate = {
        name: 'someName',
        email: 'some@email.com',
        password: 12345,
      };
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
        } = await request.post(url).send(userToCreate);

        expect(status).toBe(HTTPStatus.CREATED);
        expect(success).toBe(true);
        expect(message).toBe('Create user with success');

        expect(user.email).toEqual(userToCreate.email);
        expect(user.name).toEqual(userToCreate.name);
        expect(user.password).toBeDefined();
      });
    });

    describe('with incorrect data', () => {
      let userToCreate;

      beforeAll(async () => {
        userToCreate = {
          name: 'someName',
          email: 'invalidEmail',
          password: 12345,
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

  describe('delete to api/v1/users/:userId', () => {
    let userToAdd;
    let createdUser;

    beforeAll(async () => {
      userToAdd = {
        name: 'someName',
        email: 'some@email.com',
        password: 12345,
      };

      createdUser = await userModel.create(userToAdd);
    });

    describe('with correct id', () => {
      it('creates user properly', async () => {
        const url = usersUrls.delete(createdUser._id);
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
        const { status, body } = await extractResponse(request.delete(url));

        expect(status).toBe(HTTPStatus.BAD_REQUEST);
        expect(body.success).toBe(false);
      });
    });
  });
});
