import { eye } from '@manifoldco/icons';

export const white = () => {
  const button = document.createElement('manifold-button');
  button.textContent = 'Default (white)';

  document.body.appendChild(button);

  return button.componentOnReady();
};

export const black = () => {
  const button = document.createElement('manifold-button');
  button.textContent = 'Black';
  button.color = 'black';

  document.body.appendChild(button);

  return button.componentOnReady();
};

export const gray = () => {
  const button = document.createElement('manifold-button');
  button.textContent = 'Gray';
  button.color = 'gray';

  document.body.appendChild(button);

  return button.componentOnReady();
};

export const orange = () => {
  const button = document.createElement('manifold-button');
  button.textContent = 'Orange';
  button.color = 'orange';

  document.body.appendChild(button);

  return button.componentOnReady();
};

export const pink = () => {
  const button = document.createElement('manifold-button');
  button.textContent = 'Pink';
  button.color = 'pink';

  document.body.appendChild(button);

  return button.componentOnReady();
};

export const small = () => {
  const button = document.createElement('manifold-button');
  button.textContent = 'Small';
  button.size = 'small';

  document.body.appendChild(button);

  return button.componentOnReady();
};

export const disabled = () => {
  const button = document.createElement('manifold-button');
  button.textContent = 'Disabled';
  button.disabled = true;

  document.body.appendChild(button);

  return button.componentOnReady();
};

export const icon = () => {
  const button = document.createElement('manifold-button');

  const iconComponent = document.createElement('manifold-icon');
  iconComponent.icon = eye;

  button.appendChild(iconComponent);
  button.appendChild(document.createTextNode(' with icon'));
  document.body.appendChild(button);

  return button.componentOnReady();
};
