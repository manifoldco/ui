import { css } from 'styled-components';

export default css`
  @import url('https://fonts.googleapis.com/css?family=Hind:400,600&display=swap');

  :root {
    --blue: #2c7be5;
    --indigo: #727cf5;
    --purple: #6b5eae;
    --pink: #ff679b;
    --red: #e63757;
    --orange: #fd7e14;
    --yellow: #f6c343;
    --green: #00d97e;
    --teal: #02a8b5;
    --cyan: #39afd1;
    --gray: #95aac9;
    --gray-dark: #3b506c;
    --primary: #2c7be5;
    --secondary: #6e84a3;
    --success: #00d97e;
    --info: #39afd1;
    --warning: #f6c343;
    --danger: #e63757;
    --light: #edf2f9;
    --dark: #12263f;
    --white: #fff;
    --breakpoint-xs: 0;
    --breakpoint-sm: 576px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 992px;
    --breakpoint-xl: 1200px;
    --font-family-sans-serif: 'Hind', sans-serif;
    --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
      'Courier New', monospace;

    /********************************************************************************
     * Manifold UI Theme
     ********************************************************************************/

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

    --manifold-tag-radius: 0.375rem;

    .example-inner {
      background: #f9fbfd !important;
    }
  }
`;
