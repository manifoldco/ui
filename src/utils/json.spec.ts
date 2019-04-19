import { toJSON } from './json';

describe('toJSON method', () => {
  it('converts single-quoted strings to double-quoted', () => {
    expect(toJSON("['one', 'two']")).toEqual(['one', 'two']);
  });
});
