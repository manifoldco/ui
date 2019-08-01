import fetchMock from 'fetch-mock';

export const mockProviders = (providers: Manifold.ManifoldNode[]) => {
  fetchMock.mock('express:/v1/providers/:id', url => {
    const result = /v1\/providers\/([^/]+?)(?:\/)?$/i.exec(url);
    if (result) {
      const id = result[1];

      const found = providers.find(node => node.id === id);
      if (found) {
        return {
          status: 200,
          body: found,
        };
      }
    }
    return 404;
  });
  fetchMock.mock('express:/v1/providers/', url => {
    const realUrl = new URL(url);
    if (realUrl.searchParams.has('label')) {
      const label = realUrl.searchParams.get('label');

      const found = providers.find(node => (node.body as Manifold.ProviderBody).label === label);
      if (found) {
        return {
          status: 200,
          body: [found],
        };
      }
      return 404;
    }
    return {
      status: 200,
      body: providers,
    };
  });
};

export const mockProducts = (products: Manifold.ManifoldNode[]) => {
  fetchMock.mock('express:/v1/products/:id', url => {
    const result = /v1\/products\/([^/]+?)(?:\/)?$/i.exec(url);
    if (result) {
      const id = result[1];

      const found = products.find(node => node.id === id);
      if (found) {
        return {
          status: 200,
          body: found,
        };
      }
    }
    return 404;
  });
  fetchMock.mock('express:/v1/products', url => {
    const realUrl = new URL(url);
    const validProducts = products.filter((node: Manifold.ManifoldNode) => {
      const body = node.body as Manifold.ProductBody;

      if (realUrl.searchParams.has('tags')) {
        const tags = realUrl.searchParams.getAll('tags');

        return !!body.tags.find(tag => tags.includes(tag));
      }
      if (realUrl.searchParams.has('provider_id')) {
        const providerId = realUrl.searchParams.get('provider_id');

        return body.provider_id === providerId;
      }
      return true;
    });

    if (realUrl.searchParams.has('label')) {
      const label = realUrl.searchParams.get('label');

      const found = validProducts.find(node => (node.body as Manifold.ProductBody).label === label);
      if (found) {
        return {
          status: 200,
          body: [found],
        };
      }
      return 404;
    }
    return {
      status: 200,
      body: validProducts,
    };
  });
};

export const mockPlans = (plans: Manifold.ManifoldNode[]) => {
  fetchMock.mock('express:/v1/plans/:id', url => {
    const result = /v1\/plans\/([^/]+?)(?:\/)?$/i.exec(url);
    if (result) {
      const id = result[1];

      const found = plans.find(node => node.id === id);
      if (found) {
        return {
          status: 200,
          body: found,
        };
      }
    }
    return 404;
  });
  fetchMock.mock('express:/v1/plans', url => {
    const realUrl = new URL(url);
    const validPlans = plans.filter((node: Manifold.ManifoldNode) => {
      const body = node.body as Manifold.PlanBody;

      if (realUrl.searchParams.has('product_id')) {
        const productId = realUrl.searchParams.get('product_id');

        return body.product_id === productId;
      }
      return true;
    });

    if (realUrl.searchParams.has('label')) {
      const label = realUrl.searchParams.get('label');

      const found = validPlans.find(node => (node.body as Manifold.PlanBody).label === label);
      if (found) {
        return {
          status: 200,
          body: [found],
        };
      }
      return 404;
    }
    return {
      status: 200,
      body: validPlans,
    };
  });
};

export const mockRegions = (regions: Manifold.ManifoldNode[]) => {
  fetchMock.mock('express:/v1/regions/:id', url => {
    const result = /v1\/regions\/([^/]+?)(?:\/)?$/i.exec(url);
    if (result) {
      const id = result[1];

      const found = regions.find(node => node.id === id);
      if (found) {
        return {
          status: 200,
          body: found,
        };
      }
    }
    return 404;
  });
  fetchMock.mock('express:/v1/regions', url => {
    const realUrl = new URL(url);
    return {
      status: 200,
      body: regions.filter((node: Manifold.ManifoldNode) => {
        const body = node.body as Manifold.RegionBody;

        if (realUrl.searchParams.has('platform')) {
          const platform = realUrl.searchParams.get('platform');

          return body.platform === platform;
        }
        if (realUrl.searchParams.has('location')) {
          const location = realUrl.searchParams.get('location');

          return body.location === location;
        }
        return true;
      }),
    };
  });
};
