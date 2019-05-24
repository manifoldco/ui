export const basic = () => {
  const text = 'Basic';

  const toast = document.createElement('manifold-toast');
  toast.innerHTML = text;

  document.body.appendChild(toast);
};

export const dismissable = () => {
  const text = 'Dismissable';

  const toast = document.createElement('manifold-toast');
  toast.setAttribute('dismissable', 'true');
  toast.innerHTML = text;

  document.body.appendChild(toast);
};

export const error = () => {
  const text = 'Error';

  const toast = document.createElement('manifold-toast');
  toast.setAttribute('alert-type', 'error');
  toast.innerHTML = text;

  document.body.appendChild(toast);
};

export const success = () => {
  const text = 'Success';

  const toast = document.createElement('manifold-toast');
  toast.setAttribute('alert-type', 'success');
  toast.innerHTML = text;

  document.body.appendChild(toast);
};

export const warning = () => {
  const text = 'Warning';

  const toast = document.createElement('manifold-toast');
  toast.setAttribute('alert-type', 'warning');
  toast.innerHTML = text;

  document.body.appendChild(toast);
};
