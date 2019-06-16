import { css } from 'styled-components';

export default css`
  @import url('https://fonts.googleapis.com/css?family=Hind:400,600&display=swap');

  :root {
    /* UI Colors */
    --manifold-color-primary: #2c7be5;
    --manifold-color-success: #00d97e;
    --manifold-color-info: #39afd1;
    --manifold-color-warn: #f6c343;
    --manifold-color-error: #e63757;

    /* Text Colors */
    --manifold-text-color: #12263f;
    --manifold-text-color-secondary: #95aac9;

    /* Font */
    --manifold-font-family: 'Hind', sans-serif;
    --manifold-font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
      'Courier New', monospace;

    /* Borders */
    --manifold-radius: 0.375rem;
    --manifold-border: 1px solid #d2ddec;
    --manifold-border-hover: 1px solid #d2ddec;

    /* Cards */
    --manifold-card-shadow: 0 0.75rem 1.5rem rgba(18, 38, 63, 0.03);
    --manifold-card-border: 2px solid #edf2f9;
    --manifold-card-radius: 0.5rem;

    /* Cards:hover */
    --manifold-card-border-hover: var(--manifold-card-border);
    --manifold-card-border-active: 2px solid var(--manifold-color-primary);

    /* tags */
    --manifold-tag-radius: 0.375rem;

    .example-inner {
      background: #f9fbfd !important;
    }
  }
`;
