const authRoutes = ({
  router,
}) => {
  router.get('/', (ctx) => {
    ctx.body = 'Hello from auth!';
  });

  return router.routes();
};


export default authRoutes;
