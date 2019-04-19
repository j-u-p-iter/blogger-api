const BASE_PART = 'auth'; 

const createPath = path => `${BASE_PART}/${path}`;

export const createAuthUrls = ({ utils: { makeApiUrl } }) => ({
  signUp: () => makeApiUrl(createPath('sign-up')),
  signIn: () => makeApiUrl(createPath('sign-in')),
  resetPassword: () => makeApiUrl(createPath('reset-password')),
  currentUser: () => makeApiUrl(createPath('current-user')),
});
