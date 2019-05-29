export const primary = () => {
  const toggle = document.createElement('manifold-toggle');

  document.body.appendChild(toggle);
};

export const labeled = () => {
  const toggle = document.createElement('manifold-toggle');
  toggle.label = 'Happo Test Label';

  document.body.appendChild(toggle);
};

export const disabled = () => {
  const toggle = document.createElement('manifold-toggle');
  toggle.disabled = true;

  document.body.appendChild(toggle);
};

export const checked = () => {
  const toggle = document.createElement('manifold-toggle');
  toggle.defaultValue = true;

  document.body.appendChild(toggle);
};
