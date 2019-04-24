import request from 'superagent';
import HTTStatus from 'http-status';

import { dic } from 'dic';
import { runApp } from '../../';


describe('postsRoutes', () => {
  let postModel;
  let postsUrls;
  let extractResponse;

  beforeAll((done) => {
    runApp(() => {
      postModel = dic.resolve('postModel');
      postsUrls = dic.resolve('postsUrls');
      extractResponse = dic.resolve('utils').extractResponse;

      done();
    });
  });

  afterEach((done) => {
    postModel.deleteAll(done);
  });

  afterAll(() => {
    dic.resolve('httpServer').close();
    dic.resolve('database').close();
  });

  describe('get to api/v1/posts', () => {
    it('returns all posts', () => {
      expect(true).toBe(true);
    });
  });
});
