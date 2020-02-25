import { css } from 'styled-components';

export default css`
  @import url('https://fonts.googleapis.com/css?family=Lato:400,700&display=swap');

  :root {
    --theme-white: #fff;
    --theme-red: #ca0813;
    --theme-teal: #1fc3e9;
    --theme-green: #00b159;
    --theme-blue: #3683dc;
    --theme-blue-faded: #4d99f1;
    --theme-text: #32363c;
    --theme-text-alt: #606469;
    --theme-font-family: 'Lato', sans-serif;

    /********************************************************************************
     * Manifold UI Theme
     ********************************************************************************/

    /* UI Colors */
    --manifold-color-primary: var(--theme-blue);
    --manifold-color-success: var(--theme-green);
    --manifold-color-info: var(--theme-blue);
    --manifold-color-warn: var(--theme-red);
    --manifold-color-error: var(--theme-red);

    /* Text Colors */
    --manifold-text-color: var(--theme-text);
    --manifold-text-color-secondary: var(--theme-text-alt);
    --manifold-text-color-accent: var(--theme-white);

    /* Font */
    --manifold-font-family: var(--theme-font-family);

    /* Input Fields */
    --manifold-input-background: var(--theme-white);
    --manifold-input-border: 1px solid #ccc;

    /* Borders */
    --manifold-radius: 0;
    --manifold-border: 1px solid #f4f4f4;
    --manifold-card-background: #fbfbfb;

    /* Hovered Cards */
    --manifold-card-border-hover: 1px solid #c5c6c8;
    --manifold-card-background-hover: #f4f4f4;

    /* Active Cards */
    --manifold-card-background-active: #fbfbfb;
    --manifold-card-border-active: 1px solid var(--theme-blue);

    /* Tags */
    --manifold-tag-radius: 4px;
    --manifold-tag-font-size: 0.8rem;
    --manifold-tag-font-weight: 400;
    --manifold-tag-text-transform: lowercase;
    --manifold-tag-padding: 0 0.4rem;

    /* Buttons */
    --manifold-button-font-size: 0.9rem;
    --manifold-button-padding: 1.3em 1.6em;
  }
`;
