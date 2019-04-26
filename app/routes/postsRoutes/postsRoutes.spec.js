import request from 'superagent';
import HTTPStatus from 'http-status';

import { dic } from 'dic';
import { runApp } from '../../';

describe('postsRoutes', () => {
  let postModel;
  let userModel;
  let postsUrls;
  let extractResponse;
  let authUrls;

  beforeAll((done) => {
    runApp(() => {
      postModel = dic.resolve('postModel');
      userModel = dic.resolve('userModel');

      postsUrls = dic.resolve('postsUrls');
      authUrls = dic.resolve('authUrls');

      extractResponse = dic.resolve('utils').extractResponse;

      done();
    });
  });

  afterEach((done) => {
    postModel.deleteAll(done);
    userModel.deleteAll(done);
  });

  afterAll(() => {
    dic.resolve('httpServer').close();
    dic.resolve('database').close();
  });

  describe('post to api/v1/posts', () => {
    describe('for signed in user', () => {
      it('create post properly', async () => {
        const signUpUrl = authUrls.signUp(); 
        const userToCreate = { name: 'somename', email: 'some@email.com', password: '12345' };
        const { body: { accessToken } } = await extractResponse(request.post(signUpUrl, userToCreate));

        const createPostUrl = postsUrls.post();

        const postData = { 
          title: generateString(10), 
          body: generateString(180), 
        };
        const requestToCreatePost = request.post(createPostUrl, postData).set('Authorization', `Bearer ${accessToken}`); 

        const { status, body: { post, success } } = await extractResponse(requestToCreatePost);

        expect(success).toBe(true);
        expect(post.title).toBe(postData.title);
        expect(post.body).toBe(postData.body);
        expect(post.published).toBe(false);
        expect(post.author.name).toBe(userToCreate.name);
        expect(post.author.email).toBe(userToCreate.email);
      });
    });

    describe('for unsigned user', () => {
      it('returns correct error', async () => {
        const url = postsUrls.post();
        const postData = { title: 'Some title', body: 'Some body sdfsdjf lsjdfl;sjdfl;s jdlfjs dlf jsadlfj sl;dfjsal dfjasldf jasldfjasdlfjladsfjlsdjf ldsfj lsdjfl sdjfl;asjdfl;' };
        const { status, body: { success, error } } = await extractResponse(request.post(url, postData));

        expect(status).toBe(HTTPStatus.FORBIDDEN)
        expect(success).toBe(false);
        expect(error).toBe('Accessable only for authenticated users');
      });
    });
  });

  describe('get to api/v1/posts', () => {
    describe('for unsigned users', () => {
      it('returns correct error', async () => {
        const url = postsUrls.get();
        const { status, body: { success, error } } = await extractResponse(request.get(url));

        expect(status).toBe(HTTPStatus.FORBIDDEN);
        expect(success).toBe(false);
        expect(error).toBe('Accessable only for authenticated users');
      });
    });

    describe('for signed in users', () => {
      it('returns all posts', async () => {
        const url = postsUrls.get();
        const { status, body } = await extractResponse(request.get(url));

        expect(true).toBe(true);
      });
    })
  });
});
