import request from 'superagent';
import HTTPStatus from 'http-status';

import { dic } from 'dic';
import { runApp } from '../..';

describe('usersRoutes', () => {
  let userModel;
  let SERVER_PORT;
  let SERVER_HOST;

  beforeAll((done) => {
    runApp(() => {
      userModel = dic.resolve('userModel');

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
      const { status, body: { users, success, message } } = await request.get(`http://${SERVER_HOST}:${SERVER_PORT}/api/v1/users`);

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
        const {
          status,
          body: {
            user,
            success,
            message,
          },
        } = await request.post(`http://${SERVER_HOST}:${SERVER_PORT}/api/v1/users`).send(userToCreate).set('Accept', 'application/json');

        expect(status).toBe(HTTPStatus.CREATED);
        expect(success).toBe(true);
        expect(message).toBe('Create user with success');

        expect(user.email).toEqual(userToCreate.email);
        expect(user.name).toEqual(userToCreate.name);
        expect(user.password).toBeDefined();
      });
    });

    describe('with incorrect data', () => {
      it('returns correct error', () => {

      });
    });
  });
});
