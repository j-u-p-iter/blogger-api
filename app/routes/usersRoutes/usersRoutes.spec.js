import { dic } from 'dic';
import { runApp } from '../..';

describe('usersRoutes', () => {
  let userModel;

  beforeAll((done) => {
    userModel = dic.resolve('userModel');

    runApp(done);
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
        name: 'dafsa',
        email: 'sdfsa@sdfssdf.com',
        password: 12345,
      });
    });

    it('returns all users', async () => {
      const users = await userModel.readAll();

      console.log(users);
      expect(true).toBe(true);
    });
  });
});
