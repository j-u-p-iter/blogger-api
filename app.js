import dic from 'dic';
import * as utils from './utils';


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
        console.log(`Server is running on http://${SERVER_HOST}:${SERVER_PORT}`);
      })
      .catch(error => console.log('Server listening error: ', error));
  })
  .catch((error) => {
    console.log('Database connection error: ', error);
  });

process.on('unhandledRejection', (error) => {
  console.error('Uncaught error:', error);
});
