import { isNilOrEmpty } from './utils';

describe('Utils', () => {
  describe('isNilOrEmpty()', () => {
    test('Returns true for null, empy object, empty array and empty string values', () => {
      expect(isNilOrEmpty(null)).toBe(true);
      expect(isNilOrEmpty({})).toBe(true);
      expect(isNilOrEmpty([])).toBe(true);
      expect(isNilOrEmpty([])).toBe(true);
    });
    test("Returns false for any values that aren't null, empy object, empty array and empty string values", () => {
      expect(isNilOrEmpty('a')).toBe(false);
      expect(isNilOrEmpty({ key: 'value' })).toBe(false);
      expect(isNilOrEmpty([0])).toBe(false);
      expect(isNilOrEmpty(0)).toBe(false);
      expect(isNilOrEmpty(() => {})).toBe(false);
    });
  });
});
