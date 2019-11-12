export default function awaitPageVisibility() {
  if (!document.hidden) {
    return Promise.resolve();
  }

  return new Promise(resolve => {
    document.addEventListener('visibilitychange', resolve, { once: true });
  });
}
