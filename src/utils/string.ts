export const singularize = (word: string) => word.replace(/s$/i, '');

export const pluralize = (word: string) => {
  if (word.endsWith('s')) {
    return `${word}es`;
  }
  if (word.endsWith('y')) {
    return `${word.replace(/y$/, '')}ies`;
  }
  return `${word}s`;
};
