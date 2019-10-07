import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { Resource } from '../../types/graphql';
import { resource } from '../../spec/mock/graphql';
import { ManifoldResourcePlan } from './manifold-resource-plan';
import { ManifoldPlanDetails } from '../manifold-plan-details/manifold-plan-details';

describe('<manifold-resource-plan>', () => {
  let page: SpecPage;
  let element: HTMLManifoldResourcePlanElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [ManifoldResourcePlan, ManifoldPlanDetails],
      html: `<div></div>`,
    });
    element = page.doc.createElement('manifold-resource-plan');
  });

  it('Renders a skeleton if loading', async () => {
    element.loading = true;
    const root = page.root as HTMLElement;
    root.appendChild(element);

    await page.waitForChanges();

    expect(element).toEqualHtml(`
      <manifold-resource-plan>
       <manifold-plan-details>
         <mock:shadow-root>
           <section class="wrapper">
             <div class="card">
               <header class="header">
                 <div class="logo">
                   <manifold-skeleton-img></manifold-skeleton-img>
                 </div>
                 <div>
                   <h1 class="plan-name" itemprop="name">
                     <manifold-skeleton-text>
                       Plan name
                     </manifold-skeleton-text>
                   </h1>
                   <h2 class="product-name" itemprop="brand">
                     <manifold-skeleton-text>
                       Product name
                     </manifold-skeleton-text>
                   </h2>
                 </div>
               </header>
               <br>
               <manifold-skeleton-text>
                 Features features features features
               </manifold-skeleton-text>
               <footer class="footer">
                 <manifold-skeleton-text>
                   Free
                 </manifold-skeleton-text>
               </footer>
             </div>
           </section>
         </mock:shadow-root>
       </manifold-plan-details>
      </manifold-resource-plan>
    `);
  });

  it('Renders a product card if not loading', async () => {
    element.loading = false;
    element.gqlData = resource as Resource;
    const root = page.root as HTMLElement;
    root.appendChild(element);

    await page.waitForChanges();

    expect(element).toEqualHtml(`
     <manifold-resource-plan>
       <manifold-plan-details>
         <mock:shadow-root>
           <section class="wrapper" itemscope="" itemtype="https://schema.org/IndividualProduct">
             <div class="card">
               <header class="header">
                 <div class="logo">
                   <img alt="LogDNA" itemprop="logo" src="https://cdn.manifold.co/providers/logdna/logos/ftzzxwdr0c8wx6gh0ntf83fq4w.png">
                 </div>
                 <div>
                   <h1 class="plan-name" itemprop="name">
                     Quaco
                   </h1>
                   <h2 class="product-name" itemprop="brand">
                     LogDNA
                   </h2>
                 </div>
               </header>
               <dl class="features">
                 <dt class="feature-name">
                   Search Retention
                 </dt>
                 <dd class="feature-value">
                   0 Days
                 </dd>
                 <dt class="feature-name">
                   Storage Volume Per Day
                 </dt>
                 <dd class="feature-value">
                   0 MB
                 </dd>
                 <dt class="feature-name">
                   Users
                 </dt>
                 <dd class="feature-value">
                   1
                 </dd>
               </dl>
               <footer class="footer">
                 <manifold-plan-cost defaultcost="0" planid="23558gd5kaw5z462e3mvaknj5veuj"></manifold-plan-cost>
                 <slot name="cta"></slot>
               </footer>
             </div>
           </section>
         </mock:shadow-root>
       </manifold-plan-details>
     </manifold-resource-plan>
    `);
  });
});
