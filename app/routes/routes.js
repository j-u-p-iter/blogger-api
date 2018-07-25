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

    if (routes) { apiRouter.use(path, routes); }
  });


  return apiRouter.routes();
};


export default createRoutes;
