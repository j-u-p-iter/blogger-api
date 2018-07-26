const createHTTPServer = ({
  app,
  routes,
  middlewares,
  configs: { SERVER_PORT, SERVER_HOST },
}) => {
  const listen = () => (
    new Promise((resolve, reject) => {
      app
        .use(...middlewares)
        .use(routes);

      const httpServer = app.listen(SERVER_PORT, SERVER_HOST, () => {
        resolve(httpServer);
      });

      httpServer.on('error', error => reject(error));
    })
  );

  return { listen };
};


export default createHTTPServer;
