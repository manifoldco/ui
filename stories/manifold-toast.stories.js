import { storiesOf } from '@storybook/html';
import markdown from '../docs/docs/components/manifold-toast.md';

storiesOf('Toast', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add('basic', () => '<manifold-toast>Basic info</manifold-toast>')
  .add(
    'error',
    () =>
      '<manifold-toast alert-type="error">This is an error message letting the user know something went wrong, or to take action on.</manifold-toast>'
  )
  .add(
    'warning',
    () =>
      '<manifold-toast alert-type="warning">This is a warning toast the user should be aware of.</manifold-toast>'
  )
  .add(
    'success',
    () =>
      '<manifold-toast alert-type="success">This is a success message letting users know their action succeeded.</manifold-toast>'
  )
  .add('dismissable', () => '<manifold-toast dismissable>This is dismissable</manifold-toast>');
