import { mark } from '../packages/analytics';

const connectionEl = document.getElementsByTagName('manifold-connection').length
  ? document.getElementsByTagName('manifold-connection')[0]
  : undefined;
if (connectionEl) {
  mark(connectionEl, 'load');
  Array.prototype.slice
    .call(connectionEl.getElementsByTagName('*'))
    .filter((el: HTMLElement) => el.tagName.startsWith('MANIFOLD-'))
    .forEach((el: HTMLElement) => {
      mark(el, 'load');
    });
}

let observer: MutationObserver;
function mutationCallback(mutationsList: MutationRecord[]) {
  mutationsList
    .filter(mutation => mutation.type === 'childList')
    .forEach(mutation => {
      if (Array.isArray(mutation.addedNodes) && mutation.addedNodes.length > 1) {
        mutation.addedNodes.forEach((node: HTMLElement) => {
          if (node.tagName && node.tagName.startsWith('MANIFOLD-')) {
            mark(node, 'load');
            if (node.shadowRoot) {
              observer.observe(node.shadowRoot, { childList: true, subtree: true });
            }
          }
        });
      }
    });
}

observer = new MutationObserver(mutationCallback);
observer.observe(document, { childList: true, subtree: true });
