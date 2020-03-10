import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';
import { ManifoldPlanSelector } from './manifold-plan-selector';
import { ManifoldPlanDetails } from '../manifold-plan-details/manifold-plan-details';
import { ManifoldActivePlan } from '../manifold-active-plan/manifold-active-plan';
import { ManifoldSelect } from '../manifold-select/manifold-select';
import { createGraphqlFetch } from '../../utils/graphqlFetch';
import product from '../../spec/mock/aiven-cassandra/product';

const graphqlEndpoint = 'http://test.com/graphql';

interface Props {
  ownerId?: string;
  regions?: string;
  resourceLabel?: string;
}

async function setup(props: Props) {
  const page = await newSpecPage({
    components: [ManifoldPlanSelector, ManifoldActivePlan, ManifoldPlanDetails, ManifoldSelect],
    html: '<div></div>',
  });

  const component = page.doc.createElement('manifold-plan-selector');
  component.graphqlFetch = createGraphqlFetch({ endpoint: () => graphqlEndpoint });
  component.productLabel = 'test-product';
  component.ownerId = props.ownerId;
  component.resourceLabel = props.resourceLabel;
  component.regions = props.regions;

  const root = page.root as HTMLDivElement;
  root.appendChild(component);
  await page.waitForChanges();

  return { page, component };
}

describe(`<manifold-plan-selector>`, () => {
  beforeEach(() => fetchMock.mock(`begin:${graphqlEndpoint}`, { data: { product } }));
  afterEach(fetchMock.restore);

  describe('v0 props', () => {
    it('[product-label]', async () => {
      await setup({});
      expect(fetchMock.called(`begin:${graphqlEndpoint}`)).toBe(true);
    });

    it('[regions]', async () => {
      // these are just 3 random regions from Aiven Cassandra (the mocked product)
      const one = '235krnd90mb51mu21rgf634vyyvnw';
      const two = '235t4e0xt86hrgefbvyzh6f5dr7n4';
      const three = '235wy26njfzf53k1d050k2eg9f5ey';

      const regions = ` ${one}, ${two},${three}  `; // test a “bad” string with inconsistent spacing
      const { page } = await setup({ regions });
      const activePlan = page.root && page.root.querySelector('manifold-active-plan');
      const planDetails =
        activePlan &&
        activePlan.shadowRoot &&
        activePlan.shadowRoot.querySelector('manifold-plan-details');
      const select =
        planDetails &&
        planDetails.shadowRoot &&
        planDetails.shadowRoot.querySelector('manifold-select');
      const options = select && select.shadowRoot && select.shadowRoot.querySelectorAll('option');

      if (!options) {
        throw new Error('region select not in document');
      }

      const optionValues: string[] = [];
      options.forEach(option => {
        optionValues.push(`${option.getAttribute('value')}`);
      });
      expect(optionValues).toContain(one);
      expect(optionValues).toContain(two);
      expect(optionValues).toContain(three);
    });

    it('[owner-id]: uses if passed', async () => {
      await setup({ resourceLabel: 'my-resource', ownerId: 'my-owner-id' });

      const [[_, firstRequest]] = fetchMock.calls();
      const body = JSON.parse(`${firstRequest && firstRequest.body}`);
      const { variables } = body;

      expect(variables.owner).toBe('my-owner-id');
    });
  });
});
