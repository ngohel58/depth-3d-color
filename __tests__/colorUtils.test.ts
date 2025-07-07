import { hexToRgb } from '../utils/colorUtils';

describe('hexToRgb', () => {
  it('converts white color', () => {
    expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
  });

  it('converts black color without #', () => {
    expect(hexToRgb('000000')).toEqual({ r: 0, g: 0, b: 0 });
  });

  it('returns zeros for invalid hex', () => {
    expect(hexToRgb('#xyz')).toEqual({ r: 0, g: 0, b: 0 });
  });
});

test.todo('edge detection logic');
