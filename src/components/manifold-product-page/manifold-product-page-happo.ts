import jawsdbMock from '../../spec/mock/jawsdb/product.json';
import jawsdbProvider from '../../spec/mock/jawsdb/provider.json';
import fromJSON from '../../spec/mock/fromJSON';
import toHTML from '../../../test-utils/to-html';

export const skeleton = () => {
  const productPage = document.createElement('manifold-product-page');

  document.body.appendChild(productPage);
};

export const jawsdb = () => {
  // const productPage = document.createElement('manifold-product-page');
  // productPage.product = fromJSON(jawsdbMock);
  // productPage.provider = fromJSON(jawsdbProvider);

    const content = `
      <manifold-product-page product="${fromJSON(jawsdbMock)}" provider="${fromJSON(jawsdbProvider)}">
        <div class="sidebar-cta">
          <manifold-button name="cta" />
        </div>
      </manifold-product-page>
    `;
  
    const productPage = toHTML(content) as HTMLManifoldProductPageElement;

  document.body.appendChild(productPage);
};
