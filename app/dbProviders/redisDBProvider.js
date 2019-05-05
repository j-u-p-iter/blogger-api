import redis from 'redis';
import bluebird from 'bluebird';

const promisifiedRedis = bluebird.promisifyAll(redis); 

export const createRedisDBProvider = ({
  configs: {
    REDIS_PORT,
    REDIS_HOST,
  },
}) => {
  let client;

  const create = async () => {
    client = await redis.createClient({
      host: REDIS_HOST,
      port: REDIS_PORT,
    });

    return client;
  } 

  const quit = () => client.quit();

  return {
    create,
    quit,
    client,
  };
}
