import { Selector } from 'testcafe';

// eslint-disable-next-line
fixture`marketplace`.page`${process.env.DEPLOY_URL}/?path=/story/catalog--marketplace`;

test('filtering', async t => {
  const iframe = Selector('iframe#storybook-preview-iframe');
  const filter = Selector(() =>
    document.querySelector('manifold-marketplace-grid').shadowRoot.querySelector('input.search')
  );
  const title = Selector(() =>
    document
      .querySelector('manifold-marketplace-grid')
      .shadowRoot.querySelector('manifold-product-card-view')
      .shadowRoot.querySelector('h3.name')
  );

  await t
    .switchToIframe(iframe)
    .typeText(filter, 'auth', { paste: true })
    .expect(title.innerText)
    .eql('OAuth.io');
});
