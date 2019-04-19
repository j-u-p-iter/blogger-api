import { dic } from 'dic';
import { runApp } from '../.';;


describe('createAuthenticationService', () => {
  let authenticationService;

  beforeAll((done) => {
    runApp(() => {
      authenticationService = dic.resolve('authenticationService');

      done();
    });
  });

  it('hashes password properly', async () => {
    const originalPassword = '12345';
    const result = await authenticationService.hashPassword(originalPassword);

    expect(typeof result).toBe('string');
    expect(result).not.toBe(originalPassword);
  });

  it('checks passwords properly', async () => {
    const originalPassword = '12345';
    const hashedOriginalPassword = await authenticationService.hashPassword(originalPassword);

    let result = await authenticationService.checkPassword(originalPassword, hashedOriginalPassword);
    let expected = true;

    expect(result).toBe(expected);

    result = await authenticationService.checkPassword('wrongPassword', hashedOriginalPassword);
    expected = false;

    expect(result).toBe(expected);
  });

  it('generates token properly', () => {
    const userData = { id: 1, role: 'admin' };

    const result = authenticationService.generateToken(userData);

    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });

  it('decodes token properly', () => {

  });
});
