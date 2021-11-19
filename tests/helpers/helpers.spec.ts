import { formatDate } from '@/helpers';

describe(`Helpers`, () => {
  describe(`formatDate`, () => {
    it(`should return given timestamp formatted as locale-sepecific datetime string`, () => {
      const now = Date.now();

      expect(formatDate(now)).toEqual(new Date(now).toLocaleString());
    });

    it(`should return "-" if timestamp is not defined`, () => {
      expect(formatDate()).toEqual('-');
    });
  });
});
