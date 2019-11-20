const connectionEl = document.getElementsByTagName('manifold-connection').length
  ? document.getElementsByTagName('manifold-connection')[0]
  : undefined;
if (connectionEl) {
  performance.mark(`${connectionEl.tagName}-load-start`);
  Array.prototype.slice
    .call(connectionEl.getElementsByTagName('*'))
    .filter((el: HTMLElement) => el.tagName.startsWith('MANIFOLD-'))
    .forEach((el: HTMLElement) => {
      const markName = `${el.tagName}-load-start`;
      if (performance.getEntriesByName(markName, 'mark').length === 0) {
        performance.mark(markName);
      }
    });
}

let observer: MutationObserver;
function mutationCallback(mutationsList: MutationRecord[]) {
  mutationsList
    .filter(mutation => mutation.type === 'childList')
    .forEach(mutation => {
      if (mutation.addedNodes) {
        mutation.addedNodes.forEach((node: HTMLElement) => {
          if (node.tagName && node.tagName.startsWith('MANIFOLD-')) {
            const markName = `${node.tagName}-load-start`;
            if (performance.getEntriesByName(markName, 'mark').length === 0) {
              performance.mark(markName);
            }
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
