import fetchMock from 'fetch-mock';
import { newE2EPage } from '@stencil/core/testing';

/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */

fetchMock.restore(); // Is required because tests are run async and if fetch is mocked in the spec tests, it affects this one

describe('<manifold-resource-list>', () => {
  // TODO: Find a way to test the internal state

  it('renders the no resource state if no resources are found', async () => {
    const page = await newE2EPage({
      html: `
        <manifold-resource-list>
          <span itemprop="no-resources" slot="no-resources">No resources</span>
        </manifold-resource-list>`,
    });
    await page.$eval(
      'manifold-resource-list',
      (elm: any, props: any) => {
        elm.resources = props.resources; // TODO: This doesn't actually work, you can't set the state in tests
      },
      { resources: [] }
    );

    await page.waitForChanges();
    const noResource = await page.findAll('manifold-resource-list >>> [name="no-resources"]');
    expect(noResource).toHaveLength(1);
  });
});
