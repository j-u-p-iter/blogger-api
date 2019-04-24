const BASE_PATH = 'users'; 

const createPath = path => `${BASE_PATH}/${path}`;


export const createUsersUrls = ({ utils: { makeApiUrl } }) => ({
  get: () => makeApiUrl(BASE_PART),
  post: () => makeApiUrl(BASE_PART),
  getOne: id => makeApiUrl(createPath(id)),
  patch: id => makeApiUrl(createPath(id)),
  delete: id => makeApiUrl(createPath(id)),
});
