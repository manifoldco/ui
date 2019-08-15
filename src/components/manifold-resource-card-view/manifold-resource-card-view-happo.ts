export const skeleton = async () => {
  const card = document.createElement('manifold-resource-card-view');
  card.label = 'my-resource';
  card.loading = true;
  card.logo = 'https://cdn.manifold.co/providers/logdna/logos/ftzzxwdr0c8wx6gh0ntf83fq4w.png';
  card.name = 'my-resource';

  document.body.appendChild(card);

  return card.componentOnReady();
};

export const logDNA = async () => {
  const card = document.createElement('manifold-resource-card-view');
  card.label = 'my-resource';
  card.logo = 'https://cdn.manifold.co/providers/logdna/logos/ftzzxwdr0c8wx6gh0ntf83fq4w.png';
  card.name = 'my-resource';

  document.body.appendChild(card);

  return card.componentOnReady();
};

export const logoPlaceholder = async () => {
  const card = document.createElement('manifold-resource-card-view');
  card.label = 'my-resource';
  card.name = 'my-resource';

  document.body.appendChild(card);

  return card.componentOnReady();
};
