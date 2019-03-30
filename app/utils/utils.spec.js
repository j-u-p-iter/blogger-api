import dotenv from 'dotenv';
import path from 'path';

import * as utils from '.';

jest.mock('dotenv', () => ({ config: jest.fn() }));


describe('utils', () => {
  describe('utils.setupEnvironment()', () => {
    describe('in test environment', () => {
      it('should configure environment with .env.test file', () => {
        const configureEnvironment = dotenv.config;

        utils.setupEnvironment();

        expect(configureEnvironment).toHaveBeenCalledTimes(1);
        expect(configureEnvironment.mock.calls[0]).toEqual([path.resolve(__dirname, '../../.env.test')]);
      });
    });
  });
});
