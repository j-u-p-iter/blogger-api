import createDBConfig from '../dbConfig';


describe('createDBConfig(environmentObject)', () => {
  describe('when DB_PORT, DB_HOST and DB_NAME  was defined', () => {
    it('should return correct config', () => {
      const DB_PORT = 2000;
      const DB_HOST = 'some-host';
      const DB_NAME = 'some-db-name';
      const environmentObject = {
        DB_PORT,
        DB_HOST,
        DB_NAME,
      };

      const result = createDBConfig(environmentObject);

      expect(result).toMatchSnapshot();
    });
  });

  describe('when DB_PORT was not defined', () => {
    it('should throw', () => {
      const environmentObject = {
        DB_HOST: 'some-host',
      };

      expect(createDBConfig.bind(null, environmentObject))
        .toThrowError(/DB config validation error/);
    });
  });

  describe('when DB_HOST was not defined', () => {
    it('should throw', () => {
      const environmentObject = {
        DB_PORT: 12345,
      };

      expect(createDBConfig.bind(null, environmentObject))
        .toThrowError(/DB config validation error/);
    });
  });

  describe('when DB_NAME was not defined', () => {
    it('should throw', () => {
      const environmentObject = {
        DB_PORT: 12345,
        DB_HOST: 'some-host',
      };

      expect(createDBConfig.bind(null, environmentObject))
        .toThrowError(/DB config validation error/);
    });
  });

  describe('when DB_PORT is not a number', () => {
    it('should throw', () => {
      const environmentObject = {
        DB_PORT: 'not-a-number',
        DB_HOST: 'some-host',
      };

      expect(createDBConfig.bind(null, environmentObject))
        .toThrowError(/DB config validation error/);
    });
  });

  describe('when DB_HOST is not a string', () => {
    it('should throw', () => {
      const environmentObject = {
        DB_PORT: 5000,
        DB_HOST: 12345,
      };

      expect(createDBConfig.bind(null, environmentObject))
        .toThrowError(/DB config validation error/);
    });
  });

  describe('when DB_NAME is not a string', () => {
    it('should throw', () => {
      const environmentObject = {
        DB_PORT: 12345,
        DB_HOST: 'some-host',
        DB_NAME: 12345,
      };

      expect(createDBConfig.bind(null, environmentObject))
        .toThrowError(/DB config validation error/);
    });
  });

  describe('when DB_NAME length < 5', () => {
    it('should throw', () => {
      const environmentObject = {
        DB_PORT: 12345,
        DB_HOST: 'some-host',
        DB_NAME: '<5',
      };

      expect(createDBConfig.bind(null, environmentObject))
        .toThrowError(/DB config validation error/);
    });
  });
});
