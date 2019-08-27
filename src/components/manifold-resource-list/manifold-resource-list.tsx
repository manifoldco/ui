import { h, Component, Prop, State, Element, Watch } from '@stencil/core';

import { Marketplace } from '../../types/marketplace';
import { Catalog } from '../../types/catalog';
import { Provisioning } from '../../types/provisioning';
import Tunnel from '../../data/connection';
import { RestFetch } from '../../utils/restFetch';
import logger from '../../utils/logger';

interface FoundResource {
  id: string;
  label: string;
  name: string;
  logo?: string;
  status: string;
}

interface RealResource extends Marketplace.Resource {
  body: RealResourceBody;
}

interface RealResourceBody extends Marketplace.ResourceBody {
  team_id?: string;
  user_id?: string;
}

const PROVISION = 'provision';
const RESIZE = 'resize';
const DEPROVISION = 'deprovision';
const TRANSFER = 'transfer';

@Component({
  tag: 'manifold-resource-list',
  styleUrl: 'manifold-resource-list.css',
  shadow: true,
})
export class ManifoldResourceList {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() restFetch?: RestFetch;
  /** Disable auto-updates? */
  @Prop() paused?: boolean = false;
  /** Link format structure, with `:resource` placeholder */
  @Prop() resourceLinkFormat?: string;
  /** Should the JS event still fire, even if product-link-format is passed?  */
  @Prop() preserveEvent?: boolean = false;
  @State() interval?: number;
  @State() resources?: FoundResource[];

  @Watch('paused') pausedChange(newPaused: boolean) {
    if (newPaused) {
      window.clearInterval(this.interval);
    } else {
      this.interval = window.setInterval(() => this.fetchResources(), 3000);
    }
  }

  componentWillLoad() {
    this.fetchResources();
    if (!this.paused) {
      this.interval = window.setInterval(() => this.fetchResources(), 3000);
    }
  }

  componentDidUnload() {
    if (this.interval) {
      window.clearInterval(this.interval);
    }
  }

  static opStateToStatus(operation: Provisioning.Operation): string {
    if (![PROVISION, RESIZE, TRANSFER, DEPROVISION].includes(operation.body.type)) {
      return 'unavailable';
    }
    const opBody:
      | Provisioning.provision
      | Provisioning.resize
      | Provisioning.transfer
      | Provisioning.deprovision = operation.body;

    if (opBody.state === 'done') {
      return 'available';
    }
    return operation.body.type;
  }

  static userResources(resources: RealResource[]) {
    return resources.filter(
      ({ body: { owner_id, user_id } }) =>
        user_id || (owner_id && owner_id.indexOf('/user/') !== -1)
    );
  }

  async fetchResources() {
    if (!this.restFetch) {
      return;
    }

    // TODO: All this will be removed when graphql comes in
    const operationsResp = await this.restFetch<Provisioning.Operation[]>({
      service: 'provisioning',
      endpoint: `/operations/?is_deleted=false`,
    });

    if (operationsResp) {
      const productsResp = await this.restFetch<Catalog.Product[]>({
        service: 'catalog',
        endpoint: `/products`,
      });

      const resourcesResp = await this.restFetch<Marketplace.Resource[]>({
        service: 'marketplace',
        endpoint: `/resources/?me`,
      });

      if (resourcesResp && Array.isArray(productsResp)) {
        const userResource = ManifoldResourceList.userResources(resourcesResp);

        const resources: FoundResource[] = [];
        // First, do a run through of the operations to add any resource not covered by one or in the process of being modified by one
        operationsResp
          .filter((op: Provisioning.Operation) =>
            [PROVISION, RESIZE, TRANSFER, DEPROVISION].includes(op.body.type)
          )
          .forEach((operation: Provisioning.Operation) => {
            const opBody:
              | Provisioning.provision
              | Provisioning.resize
              | Provisioning.transfer
              | Provisioning.deprovision = operation.body;

            // Don't run this code if the operation is done, fallback to the simpler resource code.
            if (opBody.state === 'done') {
              return;
            }

            const resource = userResource.find(
              (res: RealResource) => opBody.resource_id === res.id
            );

            if (resource) {
              const product = productsResp.find(
                (prod: Catalog.Product): boolean => prod.id === resource.body.product_id
              );

              resources.push({
                id: resource.id,
                label: resource.body.label,
                name: resource.body.name,
                logo: product && product.body.logo_url,
                status: ManifoldResourceList.opStateToStatus(operation),
              });
              return;
            }
            if (operation.body.type !== PROVISION) {
              // Only provision operation without a resource should be processed
              return;
            }
            const product = productsResp.find(
              (prod: Catalog.Product): boolean =>
                prod.id === (opBody as Provisioning.provision).product_id
            );
            resources.push({
              id: opBody.resource_id || '',
              // Only the provision operation has this info
              label: (opBody as Provisioning.provision).label || '',
              name: (opBody as Provisioning.provision).name || '',
              logo: product && product.body.logo_url,
              status: ManifoldResourceList.opStateToStatus(operation),
            });
          });

        // Then run through all the real resource and add them as available if they weren't added by an operation
        userResource.forEach((resource: RealResource) => {
          if (resources.find((res: FoundResource) => res.id === resource.id)) {
            return;
          }

          const product = productsResp.find(
            (prod: Catalog.Product): boolean => prod.id === resource.body.product_id
          );
          resources.push({
            id: resource.id,
            label: resource.body.label,
            name: resource.body.name,
            logo: product && product.body.logo_url,
            status: 'available',
          });
        });

        this.resources = resources.sort((a, b) => a.label.localeCompare(b.label));
      }
    } else {
      this.resources = [];
    }
  }

  @logger()
  render() {
    if (Array.isArray(this.resources) && !this.resources.length) {
      return <slot name="no-resources" />;
    }

    return (
      <div class="wrapper">
        {Array.isArray(this.resources)
          ? this.resources.map(resource => (
              <manifold-resource-card-view
                label={resource.label}
                name={resource.name}
                logo={resource.logo}
                resourceId={resource.id}
                resourceStatus={resource.status}
                resourceLinkFormat={this.resourceLinkFormat}
                preserveEvent={this.preserveEvent}
              />
            ))
          : [1, 2, 3, 4].map(() => (
              <manifold-resource-card-view
                label="my-loading-resource"
                loading={true}
                logo="myresource.png"
                name="my-loading-resource"
              />
            ))}
        {!Array.isArray(this.resources) && <slot name="loading" />}
      </div>
    );
  }
}
Tunnel.injectProps(ManifoldResourceList, ['restFetch']);
