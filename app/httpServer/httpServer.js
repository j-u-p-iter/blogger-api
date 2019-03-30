const createHTTPServer = ({
  app,
  routes,
  middlewares,
  configs: { SERVER_PORT, SERVER_HOST },
}) => {
  let httpServer;

  const listen = () => (
    new Promise((resolve, reject) => {
      app
        .use(...middlewares)
        .use(routes);

      httpServer = app.listen(SERVER_PORT, SERVER_HOST, () => {
        resolve(httpServer);
      });

      httpServer.on('error', error => reject(error));
    })
  );

  const close = () => httpServer.close();

  return { listen, close };
};


export default createHTTPServer;
