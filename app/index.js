import { dic } from 'dic';
import { makeUrl } from '@j.u.p.iter/node-utils';


export const runApp = (onSuccessRun = () => {}) => {
  const setupEnvironment = dic.resolve('setupEnvironment');

  setupEnvironment();

  const {
    SERVER_PORT,
    SERVER_HOST,
  } = dic.resolve('configs');

  process.on('unhandledRejection', (error) => {
    /* eslint-disable-next-line */
    console.error('Uncaught error:', error);
  });

  return Promise.all([
    dic.resolve('database').connect(),
    dic.resolve('redisProvider').create(),
  ])
    .then(() => {
      dic.resolve('cacheService');

      return dic.resolve('httpServer').listen()
        .then(() => {
          /* eslint-disable-next-line */
          console.log(`Server is running on ${makeUrl({ host: SERVER_HOST, port: SERVER_PORT })}`);

          onSuccessRun();
        })
        .catch((error) => {
          /* eslint-disable-next-line */
          console.log('Server listening error: ', error)
        });
    })
    .catch((error) => {
      /* eslint-disable-next-line */
      console.log('Database connection error: ', error);
    });
};
