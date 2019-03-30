export const createAuthRoutes = ({
  router,
}) => {
  router.get('/', (req, res) => {
    res.body = 'Hello from auth!';
  });

  return router;
};
