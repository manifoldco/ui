import { eye } from '@manifoldco/icons';

export const white = () => {
  const button = document.createElement('manifold-button-link');
  button.textContent = 'Default (white)';
  button.href = '#';

  document.body.appendChild(button);

  return button.componentOnReady();
};

export const black = () => {
  const button = document.createElement('manifold-button-link');
  button.textContent = 'Black';
  button.href = '#';
  button.color = 'black';

  document.body.appendChild(button);

  return button.componentOnReady();
};

export const gray = () => {
  const button = document.createElement('manifold-button-link');
  button.textContent = 'Gray';
  button.href = '#';
  button.color = 'gray';

  document.body.appendChild(button);

  return button.componentOnReady();
};

export const orange = () => {
  const button = document.createElement('manifold-button-link');
  button.textContent = 'Orange';
  button.href = '#';
  button.color = 'orange';

  document.body.appendChild(button);

  return button.componentOnReady();
};

export const pink = () => {
  const button = document.createElement('manifold-button-link');
  button.textContent = 'Pink';
  button.href = '#';
  button.color = 'pink';

  document.body.appendChild(button);

  return button.componentOnReady();
};

export const small = () => {
  const button = document.createElement('manifold-button-link');
  button.textContent = 'Small';
  button.href = '#';
  button.size = 'small';

  document.body.appendChild(button);

  return button.componentOnReady();
};

export const icon = () => {
  const button = document.createElement('manifold-button-link');
  button.href = '#';

  const iconComponent = document.createElement('manifold-icon');
  iconComponent.icon = eye;

  button.appendChild(iconComponent);
  button.appendChild(document.createTextNode(' with icon'));
  document.body.appendChild(button);

  return button.componentOnReady();
};
