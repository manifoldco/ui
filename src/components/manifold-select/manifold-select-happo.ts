export const primary = () => {
  const defaultValue = 'foo';
  const options = [
    {
      label: 'This is freaking incredible',
      value: 'foo',
    },
    {
      label: 'Bar',
      value: 'bar',
    },
    {
      label: 'Baz',
      value: 'baz',
    },
  ];

  const name = 'Fubar';

  const select = document.createElement('manifold-select');
  select.defaultValue = defaultValue;
  select.options = options;
  select.name = name;

  document.body.appendChild(select);

  return select.componentOnReady();
};
