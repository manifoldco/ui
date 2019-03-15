import { FunctionalComponent } from '@stencil/core';

import Tunnel, { State } from '../../data/marketplace';

interface CollectionsProps {}

export const Collections: FunctionalComponent<CollectionsProps> = () => {
  return (
    <Tunnel.Consumer>
      {(state: State) => {
        return state.collections.map(c => (
          <div class="collection-container">
            <marketplace-collection
              labels={c.labels.join(',')}
              name={c.name}
              icon={c.icon}
              tagLine={c.tagLine}
            />
          </div>
        ));
      }}
    </Tunnel.Consumer>
  );
};
