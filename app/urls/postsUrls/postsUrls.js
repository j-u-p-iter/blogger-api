const BASE_PATH = 'posts';

const createPath = path => `${BASE_PATH}/${path}`;


export const createPostsUrls = ({ utils: { makeApiUrl } }) => ({
  get: () => makeApiUrl(BASE_PATH),
  post: () => makeApiUrl(BASE_PATH),
  getOne: id => makeApiUrl(createPath(id)),
  put: id => makeApiUrl(createPath(id)),
  delete: id => makeApiUrl(createPath(id)),
});
