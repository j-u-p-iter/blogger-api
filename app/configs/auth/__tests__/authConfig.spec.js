import { createAuthConfig } from '../.';


describe('createAuthConfig(environmentObject)', () => {
  describe('when PASSWORD_SALT_ROUNDS was defined properly', () => {
    it('should return correct config', () => {
      const environmentObject = {
        PASSWORD_SALT_ROUNDS: 10,
      };

      const result = createAuthConfig(environmentObject);

      expect(result).toMatchSnapshot();
    });
  });

  describe('when PASSWORD_SALT_ROUNDS was not defined', () => {
    it('should throw', () => {
      const environmentObject = {};

      expect(createAuthConfig.bind(null, environmentObject)).toThrowError(/Auth config validation error/);
    });
  });

  describe('when PASSWORD_SALT_ROUNDS is not a number', () => {
    it('should throw', () => {
      const environmentObject = {
        PASSWORD_SALT_ROUNDS: 'some string',
      };

      expect(createAuthConfig.bind(null, environmentObject)).toThrowError(/Auth config validation error/);
    });
  });
});
