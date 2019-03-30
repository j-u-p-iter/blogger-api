export const createPostsRoutes = ({
  router,
}) => {
  router.get('/', (req, res) => {
    res.body = 'Hello from posts!';
  });

  return router;
};
