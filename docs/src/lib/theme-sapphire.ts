import { css } from 'styled-components';

export default css`
  @import url('https://use.typekit.net/gbl5mjr.css');

  body {
    /* Brand */
    --theme-white: #fff;
    --theme-blue: #0069ff;
    --theme-blue-faded: #f5f9ff;
    --theme-teal: #1fc3e9;
    --theme-green: #15cd72;
    --theme-red: #ed4f32;
    --theme-lightest-gray: #f1f1f1;
    --theme-light-gray: #dfdfdf;
    --theme-gray: #cbcbcb;
    --theme-text: #444;
    --theme-text-alt: #999;
    --theme-text-body: #676767;
    --theme-font-family: 'proxima-nova', sans-serif;

    /********************************************************************************
     * Manifold UI Theme
      ********************************************************************************/

    /* UI Colors */
    --manifold-background: var(--theme-white);
    --manifold-color-primary: var(--theme-blue);
    --manifold-color-success: var(--theme-green);
    --manifold-color-info: var(--theme-teal);
    --manifold-color-warn: var(--theme-red);
    --manifold-color-error: var(--theme-red);

    /* Text Colors */
    --manifold-text-color: var(--theme-text);
    --manifold-text-color-alt: var(--theme-text-alt);
    --manifold-text-color-body: var(--theme-text-body);
    --manifold-text-color-accent: var(--theme-white);

    /* Font */
    --manifold-font-family: var(--theme-font-family);

    /* Input Fields */
    --manifold-input-background: var(--theme-white);

    /* Borders */
    --manifold-radius: 3px;
    --manifold-border: 1px solid var(--theme-light-gray);
    --manifold-card-background: var(--theme-white);

    /* Hovered Cards */
    --manifold-card-background-hover: var(--theme-lightest-gray);
    --manifold-card-border-hover: 1px solid var(--theme-gray);

    /* Active Cards */
    --manifold-card-background-active: var(--theme-blue-faded);
    --manifold-card-border-active: 1px solid var(--theme-blue);
    --manifold-card-color-active: var(--theme-blue);

    /* Tags */
    --manifold-tag-radius: var(--theme-radius);
    --manifold-tag-free-background: var(--theme-teal);
    --manifold-tag-padding: 0.3em 0.9em;
    --manifold-tag-radius: 2px;

    /* Buttons */
    --manifold-button-font-size: 0.9rem;
    --manifold-button-padding: 1.3em 1.6em;
  }
`;
