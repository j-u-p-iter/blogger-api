export const createAuthRoutes = ({
  router,
  authController: {
    signUp, 
    signIn, 
    getCurrentUser,
    resetPassword,
  },
}) => {
  router.post('/sign-in', signIn);

  router.post('/sign-up', signUp);

  router.post('/reset-password', resetPassword);

  router.get('/current-user', getCurrentUser);

  return router;
};
