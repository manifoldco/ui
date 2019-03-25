export const $ = (amount: number, options: object = {}): string => {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', ...options }).format(
    amount / 100
  );
};
