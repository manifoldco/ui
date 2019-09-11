import { storiesOf } from '@storybook/html';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { manifoldConnectionDecorator } from './connectionDecorator';
import productLabels from './data/product-labels';

storiesOf('Resource', module)
  .addDecorator(manifoldConnectionDecorator)
  .addDecorator(withKnobs)
  .add('list', () => {
    const paused = boolean('paused', true);
    return `
      <manifold-resource-list
        ${paused ? 'paused' : ''}
      ></manifold-resource-list>`;
  })
  .add('list (unstyled)', () => {
    const paused = boolean('paused', true);
    return `<manifold-data-resource-list resource-link-format="/resources/:resource"
      ${paused ? 'paused' : ''}
    ></manifold-data-resource-list>`;
  })
  .add('details', () => {
    const resourceLabel = text(
      'resource-label',
      localStorage.getItem('manifold-resource-label') || 'my-resource'
    );
    localStorage.setItem('manifold-resource-label', resourceLabel);

    // see .storybook/preview-head.html for SSO setup

    return `
    <style>
      .wrapper {
        margin-left: auto;
        margin-right: auto;
        max-width: 800px;
      }
    </style>
    <div class="wrapper">
      <manifold-resource-container resource-label="${resourceLabel}">
        <h2>${resourceLabel}</h2>
        <manifold-resource-status></manifold-resource-status>
        <h2>Product</h2>
        <manifold-resource-product></manifold-resource-product>
        <h2>Plan</h2>
        <manifold-resource-plan></manifold-resource-plan>
        <h2>SSO</h2>
        <manifold-resource-sso>Log in to Dashboard</manifold-resource-sso>
        <h2>Credentials</h2>
        <manifold-resource-credentials>
          <manifold-button color="pink" slot="show-button">
            Show credentials
          </manifold-button>
        </manifold-resource-credentials>
      </manifold-resource-container>
    </div>`;
  })
  .add('copy to clipboard', () => {
    const resourceLabel = text(
      'resource-label',
      localStorage.getItem('manifold-resource-label') || 'my-resource'
    );
    localStorage.setItem('manifold-resource-label', resourceLabel);
    text('📋 test paste', '');
    return `
      <h2>My Resources</h2>
      <manifold-data-resource-list></manifold-data-resource-list>
      <h2>Copy credentials</h2>
      Copy credentials from ${resourceLabel} to clipboard
      <manifold-copy-credentials resource-label="${resourceLabel}">
        Copy
      </manifold-copy-credentials>
    `;
  })
  .add('provision', () => {
    const newResource = text('resource-label', 'pdfshift');
    const productLabel = select('product-label', productLabels, 'pdfshift');
    const ownerId = text('owner-id', localStorage.getItem('manifold-owner-id') || '');
    localStorage.setItem('manifold-owner-id', ownerId);
    return `
      <style>
        menu {
          text-align: right;
          margin-top: 1em;
        }
      </style>
      <h2>Provision</h2>
      <manifold-plan-selector product-label="${productLabel}"></manifold-plan-selector>
      <menu>
        <manifold-data-provision-button
          owner-id="${ownerId}"
          product-label="${productLabel}"
          resource-label="${newResource}"
        >
          Provision ${newResource}
        </manifold-data-provision-button>
      </menu>
      <h2>My Resources</h2>
      <manifold-data-resource-list></manifold-data-resource-list>
    `;
  })
  .add('resize', () => {
    const resourceLabel = text(
      'resource-label',
      localStorage.getItem('manifold-resource-label') || 'my-resource'
    );
    localStorage.setItem('manifold-resource-label', resourceLabel);

    // see .storybook/preview-head.html for resize setup

    return `
      <style>
        menu {
          text-align: right;
          margin-top: 1em;
        }
      </style>
      <manifold-resource-container resource-label="${resourceLabel}">
        <manifold-plan-selector resource-label="${resourceLabel}"></manifold-plan-selector>
        <menu>
          <manifold-data-manage-button
            resource-label="${resourceLabel}"
          >
            Resize
          </manifold-data-manage-button>
        </menu>
      </manifold-resource-container>
    `;
  })
  .add('rename', () => {
    const resourceLabel = text(
      'resource-label',
      localStorage.getItem('manifold-resource-label') || 'my-resource'
    );
    localStorage.setItem('manifold-resource-label', resourceLabel);

    const newResourceLabel = text('new-resource-label', `${resourceLabel}-2`);

    // see .storybook/preview-head.html for rename setup

    return `
      <h2>My Resources</h2>
      <manifold-data-resource-list></manifold-data-resource-list>
      <h2>Rename</h2>
      <manifold-resource-container resource-label="${resourceLabel}">
        Rename
        <code>${resourceLabel}</code>
        to
        <code>${newResourceLabel}</code>
        <manifold-data-rename-button
          resource-label="${resourceLabel}"
          new-label="${newResourceLabel}"
        >
          Rename
        </manifold-data-rename-button>
      </manifold-resource-container>`;
  })
  .add('delete', () => {
    const resourceLabel = text(
      'resource-label',
      localStorage.getItem('manifold-resource-label') || 'my-resource'
    );
    localStorage.setItem('manifold-resource-label', resourceLabel);

    return `
      <style>
        menu {
          text-align: right;
          margin-top: 1em;
        }
      </style>
      <h2>My Resources</h2>
      <manifold-data-resource-list></manifold-data-resource-list>
      <h2>Delete</h2>
      <manifold-resource-container resource-label="${resourceLabel}">
        Delete <code>${resourceLabel}</code>?
        <menu>
          <manifold-data-deprovision-button
            resource-label="${resourceLabel}"
          >
            Delete ${resourceLabel}
          </manifold-data-deprovision-button>
        </menu>
      </manifold-resource-container>`;
  });
