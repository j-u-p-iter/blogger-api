import { dic } from 'dic';
import { makeUrl } from '@j.u.p.iter/node-utils';


export const runApp = (onSuccessRun = () => {}) => {
  const utils = dic.resolve('utils');

  utils.setupEnvironment();

  const {
    SERVER_PORT,
    SERVER_HOST,
  } = dic.resolve('configs');

  

  dic.resolve('database').connect()
    .then(() => {
      dic.resolve('cacheService');

      dic.resolve('httpServer').listen()
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

  process.on('unhandledRejection', (error) => {
    /* eslint-disable-next-line */
    console.error('Uncaught error:', error);
  });
};
