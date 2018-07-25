const createHTTPServer = ({
  app,
  routes,
  configs: { SERVER_PORT, SERVER_HOST },
}) => {
  const listen = () => (
    new Promise((resolve, reject) => {
      app.use(routes);

      const httpServer = app.listen(SERVER_PORT, SERVER_HOST, () => {
        resolve(httpServer);
      });

      httpServer.on('error', error => reject(error));
    })
  );

  return { listen };
};


export default createHTTPServer;
