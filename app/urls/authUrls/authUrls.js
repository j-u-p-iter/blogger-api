export const createAuthUrls = ({ utils: { makeApiUrl } }) => ({
  signUp: () => makeApiUrl('sign-up'),
  signIn: () => makeApiUrl('sign-in'),
  resetPassword: () => makeApiUrl('reset-password'),
  currentUser: () => makeApiUrl('current-user'),
});
