export default function toHTML(htmlString: string) {
  const template = document.createElement('template');
  template.innerHTML = htmlString.trim();

  if (template.content.firstChild) {
    return template.content.firstChild;
  }

  const failure = document.createElement('p');
  failure.textContent = 'Failed to create HTML from string';
  return failure;
}
