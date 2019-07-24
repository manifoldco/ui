/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// Loads base theme before styled-components tag in head.
import '@manifoldco/ui/dist/manifold/manifold.css';

export function shouldUpdateScroll({ routerProps: { location } }) {
  if (location.hash) {
    return false;
  }

  return true;
}
