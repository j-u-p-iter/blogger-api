const BASE_PART = 'users'; 

export const createUsersUrls = ({ utils: { makeApiUrl } }) => ({
  get: () => makeApiUrl(BASE_PART),
  post: () => makeApiUrl(BASE_PART),
  getOne: id => makeApiUrl(`${BASE_PART}/${id}`),
  patch: id => makeApiUrl(`${BASE_PART}/${id}`),
  delete: id => makeApiUrl(`${BASE_PART}/${id}`),
});
