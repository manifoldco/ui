export const primary = render => {
  const defaultValue = 'foo';
  const options = [
    {
      label: 'Foo',
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
};
