const createPostsRoutes = ({
  router,
}) => {
  router.get('/', (ctx) => {
    ctx.body = 'Hello from posts!';
  });

  return router.routes();
};


export default createPostsRoutes;
