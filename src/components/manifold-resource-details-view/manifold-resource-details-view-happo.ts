import resource from '../../spec/mock/cms-stage/resource.json';
import fromJSON from '../../spec/mock/fromJSON';

export const detailsLoaded = () => {
  const details = document.createElement('manifold-resource-details-view');
  details.data = fromJSON(resource);

  document.body.appendChild(details);

  return details.componentOnReady();
};

export const skeleton = () => {
  const details = document.createElement('manifold-resource-details-view');

  document.body.appendChild(details);

  return details.componentOnReady();
};
