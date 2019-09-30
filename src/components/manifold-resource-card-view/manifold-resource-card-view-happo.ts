export const skeleton = async () => {
  const card = document.createElement('manifold-resource-card-view');
  card.label = 'loading';
  card.loading = true;
  card.logo = 'https://cdn.manifold.co/providers/logdna/logos/ftzzxwdr0c8wx6gh0ntf83fq4w.png';

  document.body.appendChild(card);

  return card.componentOnReady();
};

export const logDNA = async () => {
  const card = document.createElement('manifold-resource-card-view');
  card.label = 'custom-resource';
  card.logo = 'https://cdn.manifold.co/providers/logdna/logos/ftzzxwdr0c8wx6gh0ntf83fq4w.png';
  card.resourceId = 'test';
  card.resourceStatus = 'available';

  document.body.appendChild(card);

  return card.componentOnReady();
};

export const logoPlaceholder = async () => {
  const card = document.createElement('manifold-resource-card-view');
  card.label = 'custom-resource';
  card.resourceId = 'test';
  card.resourceStatus = 'available';

  document.body.appendChild(card);

  return card.componentOnReady();
};
