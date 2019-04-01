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
    beforeAll(async () => {
      await userModel.create({
        name: 'dsfasdfasfas',
        email: 'some@email.com',
        password: 12345,
      });
    });

    it('returns all users', async () => {
      const response = await request.get(`http://${SERVER_HOST}:${SERVER_PORT}/api/v1/users`);

      expect(response.body.users).toEqual([]);
    });
  });
});
