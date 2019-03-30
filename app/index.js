import { dic } from 'dic';
import * as utils from './utils';


export const runApp = (onSuccessRun) => {
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
          console.log(`Server is running on http://${SERVER_HOST}:${SERVER_PORT}`);

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
