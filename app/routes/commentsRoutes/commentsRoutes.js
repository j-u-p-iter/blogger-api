export const createCommentsRoutes = ({
  router,
}) => {
  router.get('/', (req, res) => {
    res.body = 'Hello from comments!';
  });

  return router;
};
