/**
 * Display cents as a dollar value
 */
export const $ = (amount: number, options: object = {}): string => {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', ...options })
    .format(amount / 100)
    .replace(/\.00$/, '');
};
