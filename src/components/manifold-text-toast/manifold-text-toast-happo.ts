export const basic = () => {
  const toast = document.createElement('manifold-text-toast');
  toast.text = 'Basic';

  document.body.appendChild(toast);
};

export const dismissable = () => {
  const toast = document.createElement('manifold-text-toast');
  toast.setAttribute('dismissable', 'true');
  toast.text = 'Dismissable';

  document.body.appendChild(toast);
};

export const error = () => {
  const toast = document.createElement('manifold-text-toast');
  toast.setAttribute('alert-type', 'error');
  toast.text = 'Error';

  document.body.appendChild(toast);
};

export const success = () => {
  const toast = document.createElement('manifold-text-toast');
  toast.setAttribute('alert-type', 'success');
  toast.text = 'Success';

  document.body.appendChild(toast);
};

export const warning = () => {
  const toast = document.createElement('manifold-text-toast');
  toast.setAttribute('alert-type', 'warning');
  toast.text = 'Warning';

  document.body.appendChild(toast);
};
