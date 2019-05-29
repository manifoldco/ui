export const basic = () => {
  const toast = document.createElement('manifold-toast');
  toast.textContent = 'Basic';

  document.body.appendChild(toast);

  return toast.componentOnReady();
};

export const dismissable = () => {
  const toast = document.createElement('manifold-toast');
  toast.dismissable = true;
  toast.textContent = 'Dismissable';

  document.body.appendChild(toast);

  return toast.componentOnReady();
};

export const error = () => {
  const toast = document.createElement('manifold-toast');
  toast.alertType = 'error';
  toast.textContent = 'Error';

  document.body.appendChild(toast);

  return toast.componentOnReady();
};

export const success = () => {
  const toast = document.createElement('manifold-toast');
  toast.alertType = 'success';
  toast.textContent = 'Success';

  document.body.appendChild(toast);

  return toast.componentOnReady();
};

export const warning = () => {
  const toast = document.createElement('manifold-toast');
  toast.alertType = 'warning';
  toast.textContent = 'Warning';

  document.body.appendChild(toast);

  return toast.componentOnReady();
};
