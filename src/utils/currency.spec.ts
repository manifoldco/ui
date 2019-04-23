import { $ } from './currency';

describe('$ function', () => {
  it('formats cents into a dollar value', () => expect($(100)).toBe('$1'));
  it('rounds down correctly', () => expect($(100.4)).toBe('$1'));
  it('rounds up correctly', () => expect($(100.5)).toBe('$1.01'));
});
