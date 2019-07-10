export const primary = () => {
  const defaultValue = 'foo';
  const name = 'Fubar';

  const input = document.createElement('manifold-input');
  input.defaultValue = defaultValue;
  input.name = name;

  document.body.appendChild(input);

  return input.componentOnReady();
};
