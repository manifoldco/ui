export const atMax = () => {
  const input = document.createElement('manifold-number-input');
  input.max = 42;
  input.value = 42;
  input.unit = 'Marklars';

  document.body.appendChild(input);

  return input.componentOnReady();
};

export const atMin = () => {
  const input = document.createElement('manifold-number-input');
  input.max = 42;
  input.value = 0;
  input.unit = 'Marklars';

  document.body.appendChild(input);

  return input.componentOnReady();
};

export const inBetween = () => {
  const input = document.createElement('manifold-number-input');
  input.max = 42;
  input.value = 13;
  input.unit = 'Marklars';

  document.body.appendChild(input);

  return input.componentOnReady();
};
