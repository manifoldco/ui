import { singularize, pluralize } from './string';

describe('singularize', () => {
  it('singularizes plural words ending in “s”', () =>
    expect(singularize('hedgehogs')).toBe('hedgehog'));
  it('returns singular words as normal', () => expect(singularize('moose')).toBe('moose'));
});

describe('pluralize', () => {
  it('pluralizes normal words with an “s”', () => expect(pluralize('moose')).toBe('mooses'));
  it('pluralizes words ending in “s” with “es“', () => expect(pluralize('class')).toBe('classes'));
  it('pluralizes words ending in “y” with “ies“', () => expect(pluralize('piggy')).toBe('piggies'));
});
