import * as math from './math';

test('2 + 2 = 4', () => {
  const expected = 4;
  const actual = math.add(2, 2);
  expect(actual).toEqual(expected);
});