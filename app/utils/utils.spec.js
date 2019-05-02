import dotenv from 'dotenv';
import path from 'path';

import { setupEnvironment } from '.';


describe('utils', () => {
  let configureEnvironmentSpy;

  beforeAll(() => {
    configureEnvironmentSpy = jest.spyOn(dotenv, 'config');
  });

  describe('utils.setupEnvironment()', () => {
    describe('in test environment', () => {
      it('should configure environment with .env.test file', () => {
        setupEnvironment();

        expect(configureEnvironmentSpy).toHaveBeenCalledTimes(1);
        expect(configureEnvironmentSpy.mock.calls[0][0]).toEqual({ path: path.resolve(__dirname, '../../.env.test') });
      });
    });
  });
});
