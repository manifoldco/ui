import { css } from 'styled-components';

export default css`
  @import url('https://fonts.googleapis.com/css?family=Poppins');

  :root {
    /* TODO update to use proper colors */
    --theme-white: #fff;
    --theme-blue: #0069ff;
    --theme-blue-faded: #f5f9ff;
    --theme-teal: #1fc3e9;
    --theme-green: #15cd72;
    --theme-lightest-gray: rgba(0, 0, 0, 0.05);
    --theme-light-gray: rgba(0, 0, 0, 0.2);
    --theme-gray: rgba(0, 0, 0, 0.4);
    --theme-text-alt: #999;
    --theme-text-body: #676767;

    /* Ruby */
    --theme-red: #fb3e44;
    --theme-shadow-red: 8px 8px 0 rgba(251, 59, 73, 0.2);
    --theme-red-faded: rgba(251, 59, 73, 0.2);
    --theme-font-family: 'Poppins', sans-serif;
    --theme-text: #333;

    /********************************************************************************
     * Manifold UI Theme
     ********************************************************************************/

    /* UI Colors */
    --manifold-color-primary: var(--theme-red);
    --manifold-color-success: var(--theme-green);
    --manifold-color-info: var(--theme-teal);
    --manifold-color-warn: var(--theme-red);
    --manifold-color-error: var(--theme-red);

    /* Text Colors */
    --manifold-text-color: var(--theme-text);
    --manifold-text-color-secondary: var(--theme-text-alt);
    --manifold-text-color-body: var(--theme-text-body);
    --manifold-text-color-accent: var(--theme-white);

    /* Font */
    --manifold-font-family: var(--theme-font-family);

    /* Input Fields */
    --manifold-input-background: var(--theme-lightest-gray);
    --manifold-input-border: 1px solid var(--theme-lightest-gray);

    /* Borders */
    --manifold-radius: 0;
    --manifold-border: 1px solid var(--theme-light-gray);
    --manifold-card-background: var(--theme-white);

    /* Hovered Cards */
    --manifold-card-border-hover: 1px solid var(--theme-red);

    /* Active Cards */
    --manifold-card-background-active: var(--theme-red-faded);
    --manifold-card-border-active: 1px solid var(--theme-red);
    --manifold-card-color-active: var(--theme-red);

    /* Tags */
    --manifold-tag-radius: 4px;
    --manifold-tag-font-weight: 400;
    --manifold-tag-text-transform: lowercase;

    /* Buttons */
    --manifold-button-font-size: 0.9rem;
    --manifold-button-padding: 1.3em 1.6em;
    --manifold-button-shadow: 8px 8px 0 rgba(251, 59, 73, 0.2);
    --manifold-button-shadow-hover: 0 0 0 rgba(251, 59, 73, 0.2);
  }
`;
