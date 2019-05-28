import toHTML from '../../../test-utils/to-html';

export const basic = () => {
  const toast = toHTML('<manifold-toast>Basic</manifold-toast>');

  document.body.appendChild(toast);
};

export const dismissable = () => {
  const toast = toHTML('<manifold-toast dismissable>Dismissable</manifold-toast>');

  document.body.appendChild(toast);
};

export const error = () => {
  const toast = toHTML('<manifold-toast>Error</manifold-toast>') as HTMLManifoldToastElement;
  toast.alertType = 'error';

  document.body.appendChild(toast);
};

export const success = () => {
  const toast = toHTML('<manifold-toast>Success</manifold-toast>') as HTMLManifoldToastElement;
  toast.alertType = 'success';

  document.body.appendChild(toast);
};

export const warning = () => {
  const toast = toHTML('<manifold-toast>Warning</manifold-toast>') as HTMLManifoldToastElement;
  toast.alertType = 'warning';

  document.body.appendChild(toast);
};
