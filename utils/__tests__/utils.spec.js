import dotenv from 'dotenv';
import * as utils from '../utils';

jest.mock('dotenv', () => ({ config: jest.fn() }));


describe('utils', () => {
  describe('utils.setupEnvironment()', () => {
    it('should configure environment', () => {
      const configureEnvironment = dotenv.config;

      utils.setupEnvironment();

      expect(configureEnvironment).toHaveBeenCalledTimes(1);
      expect(configureEnvironment.mock.calls[0]).toEqual([]);
    });
  });
});
