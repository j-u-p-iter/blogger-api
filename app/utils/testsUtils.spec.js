import * as testUtils from './testsUtils';
import validator from 'validator';


describe('testUtils', () => {
  describe('generateString', () => {
    it('generates correct string', () => {
      let stringLength = 8;
      let resultString = testUtils.generateString(stringLength);

      expect(typeof resultString).toBe('string');
      expect(resultString.length).toBe(stringLength);

      stringLength = 12;
      resultString = testUtils.generateString(stringLength);

      expect(typeof resultString).toBe('string');
      expect(resultString.length).toBe(stringLength);
    });
  });

  describe('generateEmail', () => {
    it('generates email properly', () => {
      let email = testUtils.generateEmail(); 

      expect(validator.isEmail(email)).toBe(true);

      let newEmail = testUtils.generateEmail();

      expect(validator.isEmail(newEmail)).toBe(true);
      expect(newEmail).not.toBe(email);
    });
  });
});
