const createUsersRoutes = ({
  router,
}) => {
  router.get('/', (ctx) => {
    ctx.body = 'Hello from users!';
  });

  return router.routes();
};


export default createUsersRoutes;
