import { css } from 'styled-components';

export default css`
  @import url('https://use.typekit.net/gbl5mjr.css');

  body {
    /* Brand */
    --do-white: #fff;
    --do-blue: #0069ff;
    --do-blue-faded: #f5f9ff;
    --do-teal: #1fc3e9;
    --do-green: #15cd72;
    --do-red: #ed4f32;
    --do-lightest-gray: #f1f1f1;
    --do-light-gray: #dfdfdf;
    --do-gray: #cbcbcb;
    --do-text: #444;
    --do-text-alt: #999;
    --do-text-body: #676767;
    --do-font-family: 'proxima-nova', sans-serif;

    /********************************************************************************
     * Manifold UI Theme
      ********************************************************************************/

    /* UI Colors */
    --manifold-background: var(--do-white);
    --manifold-color-primary: var(--do-blue);
    --manifold-color-success: var(--do-green);
    --manifold-color-info: var(--do-teal);
    --manifold-color-warn: var(--do-red);
    --manifold-color-error: var(--do-red);

    /* Text Colors */
    --manifold-text-color: var(--do-text);
    --manifold-text-color-alt: var(--do-text-alt);
    --manifold-text-color-body: var(--do-text-body);
    --manifold-text-color-accent: var(--do-white);

    /* Font */
    --manifold-font-family: var(--do-font-family);

    /* Input Fields */
    --manifold-input-background: var(--do-white);

    /* Borders */
    --manifold-radius: 3px;
    --manifold-border: 1px solid var(--do-light-gray);
    --manifold-card-background: var(--do-white);

    /* Hovered Cards */
    --manifold-card-background-hover: var(--do-lightest-gray);
    --manifold-card-border-hover: 1px solid var(--do-gray);

    /* Active Cards */
    --manifold-card-background-active: var(--do-blue-faded);
    --manifold-card-border-active: 1px solid var(--do-blue);
    --manifold-card-color-active: var(--do-blue);

    /* Tags */
    --manifold-tag-radius: var(--do-radius);
    --manifold-tag-free-background: var(--do-teal);
    --manifold-tag-padding: 0.3em 0.9em;
    --manifold-tag-radius: 2px;

    /* Buttons */
    --manifold-button-font-size: 0.9rem;
    --manifold-button-padding: 1.3em 1.6em;
  }
`;
