import createServerConfig from '../serverConfig';


describe('createServerConfig(environmentObject)', () => {
  describe('when SERVER_PORT and SERVER_HOST  was defined', () => {
    it('should return correct config', () => {
      const SERVER_PORT = 2000;
      const SERVER_HOST = 'some-host';
      const environmentObject = {
        SERVER_PORT,
        SERVER_HOST,
      };

      const result = createServerConfig(environmentObject);
      const expected = {
        server: {
          PORT: SERVER_PORT,
          HOST: SERVER_HOST,
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when SERVER_PORT was not defined', () => {
    it('should throw', () => {
      const environmentObject = {
        SERVER_HOST: 'some-host',
      };

      expect(createServerConfig.bind(null, environmentObject))
        .toThrowError(/Server config validation error/);
    });
  });

  describe('when SERVER_HOST was not defined', () => {
    it('should throw', () => {
      const environmentObject = {
        SERVER_PORT: 12345,
      };

      expect(createServerConfig.bind(null, environmentObject))
        .toThrowError(/Server config validation error/);
    });
  });

  describe('when SERVER_PORT is not a number', () => {
    it('should throw', () => {
      const environmentObject = {
        SERVER_PORT: 'not-a-number',
        SERVER_HOST: 'some-host',
      };

      expect(createServerConfig.bind(null, environmentObject))
        .toThrowError(/Server config validation error/);
    });
  });

  describe('when SERVER_HOST is not a string', () => {
    it('should throw', () => {
      const environmentObject = {
        SERVER_PORT: 5000,
        SERVER_HOST: 12345,
      };

      expect(createServerConfig.bind(null, environmentObject))
        .toThrowError(/Server config validation error/);
    });
  });
});
