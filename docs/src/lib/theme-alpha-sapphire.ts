import { css } from 'styled-components';

export default css`
  @import url('https://fonts.googleapis.com/css?family=PT+Sans+Caption:400,700&display=swap');

  :root {
    /* Alpha Sapphire */
    --theme-white: #fff;
    --theme-blue-faded: #f5f9ff;
    --theme-teal: #1fc3e9;
    --theme-green: #15cd72;
    --theme-red: #ed4f32;
    --theme-lightest-gray: #f1f1f1;
    --theme-light-gray: #dfe1e6;
    --theme-gray: #cbcbcb;

    /* Alpha Sapphire */
    --theme-blue: #0052cc;
    --theme-text: rgb(23, 43, 77);
    --theme-text-alt: #707070;
    --theme-text-body: #6b778c;

    /********************************************************************************
     * Manifold UI Theme
     ********************************************************************************/

    /* UI Colors */
    --manifold-color-primary: var(--theme-blue);
    --manifold-color-success: var(--theme-green);
    --manifold-color-info: var(--theme-teal);
    --manifold-color-warn: var(--theme-red);
    --manifold-color-error: var(--theme-red);

    /* Text Colors */
    --manifold-text-color: var(--theme-text);
    --manifold-text-color-secondary: var(--theme-text-alt);
    --manifold-text-color-body: var(--theme-text-body);
    --manifold-text-color-accent: var(--theme-white);

    /* Input Fields */
    --manifold-input-radius: 3px;
    --manifold-input-background: var(--theme-white);
    --manifold-input-border-focus: 2px solid #4c9aff;

    /* Borders */
    --manifold-radius: 5px;
    --manifold-border: 1px solid var(--theme-light-gray);
    --manifold-card-background: var(--theme-white);

    /* Cards */
    --manifold-card-shadow: rgba(9, 30, 66, 0.28) 0px 4px 8px -2px, rgba(9, 30, 66, 0.3) 0px 0px 1px;

    /* Hovered Cards */
    --manifold-card-background-hover: var(--theme-lightest-gray);
    --manifold-card-border-hover: 1px solid var(--theme-gray);

    /* Active Cards */
    --manifold-card-background-active: var(--theme-blue-faded);
    --manifold-card-border-active: 1px solid var(--theme-blue);
    --manifold-card-color-active: var(--theme-blue);

    /* Tags */
    --manifold-tag-radius: var(--theme-radius);
    --manifold-tag-free-background: #f6c342;
    --manifold-tag-free-text-color: #594300;
    --manifold-tag-padding: 2px 5px;
    --manifold-tag-radius: 3px;
    --manifold-tag-text-transform: uppercase;

    /* Buttons */
    --manifold-button-font-size: 0.9rem;
    --manifold-button-padding: 1.3em 1.6em;
  }
`;
