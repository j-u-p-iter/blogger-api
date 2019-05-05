import { createRedisConfig } from './redisConfig';


describe('createRedisConfig(environmentObject)', () => {
  describe('when REDIS_PORT and REDIS_HOST were defined', () => {
    it('should return correct config', () => {
      const REDIS_PORT = 5000;
      const REDIS_HOST = 'redis-host';
      const environmentObject = {
        REDIS_PORT,
        REDIS_HOST,
      };

      const result = createRedisConfig(environmentObject);

      expect(result).toMatchSnapshot();
    });
  });
});
