import { css } from 'styled-components';

export default css`
  :root {
    /* Default Theme */
    --manifold-c-black-0: rgba(0, 0, 0, 0);
    --manifold-c-black-03: rgba(0, 0, 0, 0.03);
    --manifold-c-black-05: rgba(0, 0, 0, 0.05);
    --manifold-c-black-07: rgba(0, 0, 0, 0.07);
    --manifold-c-black-10: rgba(0, 0, 0, 0.1);
    --manifold-c-black-20: rgba(0, 0, 0, 0.2);
    --manifold-c-black-25: rgba(0, 0, 0, 0.25);
    --manifold-c-black-30: rgba(0, 0, 0, 0.3);
    --manifold-c-black-40: rgba(0, 0, 0, 0.4);
    --manifold-c-black-50: rgba(0, 0, 0, 0.5);
    --manifold-c-black-60: rgba(0, 0, 0, 0.6);
    --manifold-c-black-70: rgba(0, 0, 0, 0.6);
    --manifold-c-black-75: rgba(0, 0, 0, 0.75);
    --manifold-c-black-80: rgba(0, 0, 0, 0.8);
    --manifold-c-black-90: rgba(0, 0, 0, 0.9);

    /* colors */
    --manifold-c-black: rgb(34, 34, 34);
    --manifold-c-offWhite: rgb(247, 247, 248);
    --manifold-c-gray-t5: rgb(245, 247, 249);
    --manifold-c-gray-t3: rgb(221, 221, 222);
    --manifold-c-gray-t2: rgb(207, 207, 207);
    --manifold-c-gray: rgb(143, 143, 149);
    --manifold-c-gray-s1: rgb(87, 91, 95);
    --manifold-c-gray-s2: rgb(50, 57, 64);
    --manifold-c-white: #fff;
    --manifold-c-purple: rgb(119, 72, 209);
    --manifold-c-blue-t4: rgb(237, 245, 255);
    --manifold-c-blue: rgb(30, 80, 218);
    --manifold-c-orange: rgb(254, 113, 75);
    --manifold-c-magenta: rgb(180, 88, 119);
    --manifold-c-red: rgb(213, 15, 73);
    --manifold-c-teal: rgb(15, 181, 208);
    --manifold-c-gold: rgb(245, 139, 35);
    --manifold-c-green: rgb(49, 186, 162);
    --manifold-c-yellow: rgb(255, 222, 82);

    /* rgb colors */
    --manifold-c-blue-rgb: 30, 80, 218;
    --manifold-c-gray-rgb: 143, 143, 149;
    --manifold-c-red-rgb: 213, 15, 73;
    --manifold-c-gold-rgb: 245, 139, 35;
    --manifold-c-green-rgb: 49, 186, 162;

    /* gradients */
    --manifold-g-blue: linear-gradient(to top right, #329dd1, #4f50a4);
    --manifold-g-blueFaded: linear-gradient(to top right, #c5c6ff, #b1e5ff);
    --manifold-g-cta: linear-gradient(63deg, #f56d41, #b54a84);
    --manifold-g-gray: linear-gradient(45deg, var(--manifold-c-gray-t3), var(--manifold-c-gray-t5));
    --manifold-g-green: linear-gradient(to top right, #329dd1, #55f0a8);
    --manifold-g-greenFaded: linear-gradient(to top right, #d5f1ff, #d2f5e4);
    --manifold-g-orange: linear-gradient(to top right, #fe3a57, #fdc836);
    --manifold-g-orangeFaded: linear-gradient(to top right, #f5bca5, #fff1d7);
    --manifold-g-orangeBurnt: linear-gradient(90deg, #ec7740, #a65084);
    --manifold-g-purple: linear-gradient(to top right, #543edd, #a572ff);
    --manifold-g-purpleFaded: linear-gradient(to top right, #cbc3ff, #eadeff);
    --manifold-g-red: linear-gradient(to top right, #a65084, #ec7740);
    --manifold-g-redFaded: linear-gradient(to top right, #f1b2ce, #ffcbb3);
    --manifold-g-skyBlue: linear-gradient(-152deg, #388dc7 5%, #4e56a7 98%);
    --manifold-g-yellow: linear-gradient(to top right, #ffb83a, #ffe268);
    --manifold-g-yellowFaded: linear-gradient(to top right, #ffd995, #fff7d3);
    --manifold-g-custom: linear-gradient(to top right, #eadeff, #f9f5ff);

    /* Button */
    --manifold-button-background: var(--manifold-g-cta);

    /* Tags */
    --manifold-tag-radius: 1em;
    --manifold-tag-free-background: var(--manifold-g-green);
  }
`;
