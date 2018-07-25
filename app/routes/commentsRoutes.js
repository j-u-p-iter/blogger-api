const createCommentsRoutes = ({
  router,
}) => {
  router.get('/', (ctx) => {
    ctx.body = 'Hello from comments!';
  });

  return router.routes();
};


export default createCommentsRoutes;
