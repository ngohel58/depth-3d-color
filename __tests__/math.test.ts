import { add, clamp } from '../utils/math';

describe('math utilities', () => {
  test('add sums numbers', () => {
    expect(add(1, 2)).toBe(3);
  });

  test('clamp limits values', () => {
    expect(clamp(10, 0, 5)).toBe(5);
    expect(clamp(-1, 0, 5)).toBe(0);
    expect(clamp(3, 0, 5)).toBe(3);
  });
});
