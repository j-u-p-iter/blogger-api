import redis from 'redis';
import bluebird from 'bluebird';

const promisifiedRedis = bluebird.promisifyAll(redis); 

export const createRedisDBProvider = () => {
  let client;

  const create = async () => {
    client = await redis.createClient();

    return client;
  } 

  const quit = () => { 
    console.log('quit client');

    return client.end(true);
  }

  return {
    create,
    quit,
    client,
  };
}
