export const createUsersUrls = (baseUrl) => ({
  get: () => `${baseUrl}/users`,
  post: () => `${baseUrl}/users`,
  patch: id => `${baseUrl}/users/${id}`,
  delete: id => `${baseUrl}/users/${id}`,
});
