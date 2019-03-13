export const $ = (amount: number, options: object = {}) => {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', ...options }).format(
    amount / 100
  );
};
