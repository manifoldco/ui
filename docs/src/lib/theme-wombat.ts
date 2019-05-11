import { css } from 'styled-components';

export default css`
  @import url('https://fonts.googleapis.com/css?family=Poppins');

  body {
    /* Brand */
    --wombat-white: #fff;
    --wombat-blue: #0069ff;
    --wombat-blue-faded: #f5f9ff;
    --wombat-teal: #1fc3e9;
    --wombat-green: #15cd72;
    --wombat-lightest-gray: rgba(0, 0, 0, 0.05);
    --wombat-light-gray: rgba(0, 0, 0, 0.2);
    --wombat-gray: rgba(0, 0, 0, 0.4);
    --wombat-text-alt: #999;
    --wombat-text-body: #676767;

    /* Wombat */
    --wombat-red: #fb3e44;
    --wombat-shadow-red: 8px 8px 0 rgba(251, 59, 73, 0.2);
    --wombat-red-faded: rgba(251, 59, 73, 0.2);
    --wombat-font-family: 'Poppins', sans-serif;
    --wombat-text: #333;

    /********************************************************************************
   * Manifold UI Theme
   ********************************************************************************/

    /* UI Colors */
    --manifold-background: var(--wombat-white);
    --manifold-color-primary: var(--wombat-red);
    --manifold-color-secondary: var(--wombat-red);
    --manifold-color-success: var(--wombat-green);
    --manifold-color-info: var(--wombat-teal);
    --manifold-color-warn: var(--wombat-red);
    --manifold-color-error: var(--wombat-red);

    /* Text Colors */
    --manifold-text-color: var(--wombat-text);
    --manifold-text-color-alt: var(--wombat-text-alt);
    --manifold-text-color-body: var(--wombat-text-body);
    --manifold-text-color-accent: var(--wombat-white);

    /* Font */
    --manifold-font-family: var(--wombat-font-family);

    /* Input Fields */
    --manifold-input-background: var(--wombat-lightest-gray);
    --manifold-input-border: var(--wombat-lightest-gray);
    --manifold-input-border-focus: var(--wombat-lightest-gray);

    /* Borders */
    --manifold-radius: 0;
    --manifold-border: 1px solid var(--wombat-light-gray);
    --manifold-card-background: var(--wombat-white);

    /* Hovered Cards */
    --manifold-card-border-hover: 1px solid var(--wombat-red);

    /* Active Cards */
    --manifold-card-background-active: var(--wombat-red-faded);
    --manifold-card-border-active: 1px solid var(--wombat-red);
    --manifold-card-color-active: var(--wombat-red);

    /* Tags */
    --manifold-tag-radius: 4px;
    --manifold-tag-background: var(--wombat-red);

    /* Buttons */
    --manifold-button-font-size: 0.9rem;
    --manifold-button-padding: 1.3em 1.6em;
    --manifold-button-shadow: 8px 8px 0 rgba(251, 59, 73, 0.2);
    --manifold-button-shadow-hover: 0 0 0 rgba(251, 59, 73, 0.2);
  }
`;
