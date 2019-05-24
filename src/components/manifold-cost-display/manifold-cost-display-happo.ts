export const primary = () => {
  const cost = document.createElement('manifold-cost-display');
  cost.baseCost = 8000;
  cost.compact = false;
  cost.isCustomizable = false;

  document.body.appendChild(cost);
};

export const compact = () => {
  const cost = document.createElement('manifold-cost-display');
  cost.baseCost = 8000;
  cost.compact = true;
  cost.isCustomizable = false;

  document.body.appendChild(cost);
};

export const customizable = () => {
  const cost = document.createElement('manifold-cost-display');
  cost.baseCost = 8000;
  cost.compact = false;
  cost.isCustomizable = true;

  document.body.appendChild(cost);
};
