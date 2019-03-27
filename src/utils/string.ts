export const singularize = (word: string) => word.replace(/s$/i, '');

export const pluralize = (word: string) => (word.endsWith('s') ? `${word}es` : `${word}s`);
