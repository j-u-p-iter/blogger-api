import request from 'superagent';
import HTTPStatus from 'http-status';

import { dic } from 'dic';
import { runApp } from '../../';

import { generateString, signUpUser, sendRequestWithToken } from '../../utils/testsUtils';

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
        const { userId, accessToken } = await signUpUser({ 
          extractResponse,
          url: authUrls.signUp(), 
          user: { name: 'somename', email: 'some@email.com', password: '12345' } 
        });

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
        expect(post.author).toBe(userId);
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
    let postsToCreate;
    let accessToken;
    let userId;
    let userToCreate;

    beforeAll(async (done) => {
      ({ userId, accessToken } = await signUpUser({ 
        extractResponse,
        url: authUrls.signUp(), 
        user: { name: 'somename', email: 'some@email.com', password: '12345' } 
      }));

      const createPostUrl = postsUrls.post(); 

      postsToCreate = [{
        title: generateString(12),
        body: generateString(190),
      }, {
        title: generateString(20),
        body: generateString(250),
      }];

      await sendRequestWithToken(request.post(createPostUrl, postsToCreate[0]), accessToken);
      await sendRequestWithToken(request.post(createPostUrl, postsToCreate[1]), accessToken);

      done();
    });

    it('returns all posts', async () => {
      const url = postsUrls.get();
      let { status, body: { posts } } = await extractResponse(sendRequestWithToken(request.get(url), accessToken));

      expect(status).toBe(HTTPStatus.OK);
      expect(posts.length).toBe(2);

      const [firstPost, secondPost] = posts; 

      expect(firstPost.title).toBe(postsToCreate[0].title);
      expect(firstPost.body).toBe(postsToCreate[0].body);
      expect(firstPost.published).toBe(false);
      expect(firstPost.author).toBe(userId);

      expect(secondPost.title).toBe(postsToCreate[1].title);
      expect(secondPost.body).toBe(postsToCreate[1].body);
      expect(secondPost.published).toBe(false);
      expect(secondPost.author).toBe(userId);
    });
  });

  describe('get to api/v1/posts/:postId', () => {
    it('returns correct error', async () => {
      const postId = 12345;
      const url = postsUrls.getOne(postId);

      const { status, body: { success, error } } = await extractResponse(request.get(url));

      expect(status).toBe(HTTPStatus.NOT_FOUND);
      expect(success).toBe(false);
      expect(error).toBe(`No post with id ${postId}`);
    });

    describe('when user is signed in', () => {
      let accessToken;
      let userId;
      let firstPostId;
      let secondPostId;
      let firstPostToCreate;
      let secondPostToCreate;

      beforeAll(async (done) => {
        ({ userId, accessToken } = await signUpUser({ 
          extractResponse,
          url: authUrls.signUp(), 
          user: { name: 'somename', email: 'some@email.com', password: '12345' } 
        }));

        firstPostToCreate = {
          title: generateString(12),
          body: generateString(190),
        };

        secondPostToCreate = {
          title: generateString(25),
          body: generateString(210),
        };

        const createPostUrl = postsUrls.post(); 
        ({ body: { post: { _id: firstPostId } } } = await sendRequestWithToken(request.post(createPostUrl, firstPostToCreate), accessToken));
        ({ body: { post: { _id: secondPostId } } } = await sendRequestWithToken(request.post(createPostUrl, secondPostToCreate), accessToken));

        done();
      });

      it('returns correct post', async () => {
        let url = postsUrls.getOne(firstPostId);
        let { status, body: { success, post } } = await extractResponse(sendRequestWithToken(request.get(url), accessToken));

        expect(status).toBe(HTTPStatus.OK);
        expect(success).toBe(true);
        expect(post.title).toBe(firstPostToCreate.title);
        expect(post.body).toBe(firstPostToCreate.body);

        url = postsUrls.getOne(secondPostId);
        ({ status, body: { success, post } } = await extractResponse(sendRequestWithToken(request.get(url), accessToken)));

        expect(status).toBe(HTTPStatus.OK);
        expect(success).toBe(true);
        expect(post.title).toBe(secondPostToCreate.title);
        expect(post.body).toBe(secondPostToCreate.body);
      });
    });
  });
});
