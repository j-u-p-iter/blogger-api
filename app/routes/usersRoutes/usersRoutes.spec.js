import request from 'superagent';

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
      const { body: { users } } = await request.get(`http://${SERVER_HOST}:${SERVER_PORT}/api/v1/users`);

      const resultCount = users.length;
      const expectedCount = insertingUsers.length;

      expect(resultCount).toBe(expectedCount);

      const resultFirstUser = users[0];
      const resultSecondUser = users[1];

      const expectedFirstUser = insertingUsers[0];
      const expectedSecondUser = insertingUsers[1];

      // assertions for first user
      expect(resultFirstUser.email).toBe(expectedFirstUser.email);
      expect(resultFirstUser.name).toBe(expectedFirstUser.name);
      expect(resultFirstUser.role).toBe('user');
      expect(resultFirstUser.password).toBeDefined();

      // assertions for sedond user
      expect(resultSecondUser.email).toBe(expectedSecondUser.email);
      expect(resultSecondUser.name).toBe(expectedSecondUser.name);
      expect(resultSecondUser.role).toBe('admin');
      expect(resultSecondUser.password).toBeDefined();
    });
  });
});
