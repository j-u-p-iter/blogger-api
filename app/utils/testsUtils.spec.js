import * as testUtils from './testsUtils';


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
});
