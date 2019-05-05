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

  describe('when REDIS_PORT is not defined', () => {
    it('should throw', () => {
      const environmentObject = {
        REDIS_HOST: 'redis-host',
      };

      expect(createRedisConfig.bind(null, environmentObject))
        .toThrowError(/Redis config validation error/);
    });
  });

  describe('when REDIS_HOST is not defined', () => {
    it('should throw', () => {
      const environmentObject = {
        REDIS_PORT: 12345,
      };

      expect(createRedisConfig.bind(null, environmentObject))
        .toThrowError(/Redis config validation error/);
    });
  });

  describe('when REDIS_PORT is not a number', () => {
    it('should throw', () => {
      const environmentObject = {
        REDIS_PORT: 'not-a-number',
        REDIS_HOST: 'some-host',
      };

      expect(createRedisConfig.bind(null, environmentObject))
        .toThrowError(/Redis config validation error/);
    });
  });

  describe('when REDIS_HOST is not a string', () => {
    it('should throw', () => {
      const environmentObject = {
        REDIS_PORT: 12345,
        REDIS_HOST: 12345,
      };

      expect(createRedisConfig.bind(null, environmentObject))
        .toThrowError(/Redis config validation error/);
    });
  });
});
