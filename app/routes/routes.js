const createRoutes = ({
  apiRouter,
  usersRoutes,
  postsRoutes,
  commentsRoutes,
  authRoutes,
}) => {
  const mapPathsToRoutes = {
    '/users': usersRoutes,
    '/posts': postsRoutes,
    '/comments': commentsRoutes,
    '/auth': authRoutes,
  };

  Object.keys(mapPathsToRoutes).forEach((path) => {
    const routes = mapPathsToRoutes[path];

    if (routes) { apiRouter.use(`/api/v1${path}`, routes); }
  });


  return apiRouter;
};


export default createRoutes;
