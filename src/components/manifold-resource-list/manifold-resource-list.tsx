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
    switch (operation.body.type) {
      case 'provision':
        return (operation.body as Provisioning.provision).state === 'done'
          ? 'available'
          : operation.body.type;
      case 'resize':
        return (operation.body as Provisioning.resize).state === 'done'
          ? 'available'
          : operation.body.type;
      case 'transfer':
        return (operation.body as Provisioning.transfer).state === 'done'
          ? 'available'
          : operation.body.type;
      case 'deprovision':
        return (operation.body as Provisioning.deprovision).state === 'done'
          ? 'unavailable'
          : operation.body.type;
      default:
        return 'unavailable';
    }
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

    if (operationsResp instanceof Error) {
      console.error(operationsResp);
      return;
    }

    if (Array.isArray(operationsResp)) {
      const productsResp = await this.restFetch<Catalog.Product[]>({
        service: 'catalog',
        endpoint: `/products`,
      });

      if (productsResp instanceof Error) {
        return;
      }

      const resourcesResp = await this.restFetch<Marketplace.Resource[]>({
        service: 'marketplace',
        endpoint: `/resources/?me`,
      });

      if (resourcesResp instanceof Error) {
        console.error(resourcesResp);
        return;
      }
      const resources = ManifoldResourceList.userResources(resourcesResp);

      this.resources = [];
      // First, do a run through of the operations to add any resource not covered by one or in the process of being modified by one
      operationsResp
        .filter((op: Provisioning.Operation) =>
          ['provision', 'resize', 'transfer', 'deprovision'].includes(op.body.type)
        )
        .forEach((operation: Provisioning.Operation) => {
          let opBody:
            | Provisioning.provision
            | Provisioning.resize
            | Provisioning.transfer
            | Provisioning.deprovision;
          switch (operation.body.type) {
            case 'provision':
              opBody = operation.body as Provisioning.provision;
              break;
            case 'resize':
              opBody = operation.body as Provisioning.resize;
              break;
            case 'transfer':
              opBody = operation.body as Provisioning.transfer;
              break;
            case 'deprovision':
              opBody = operation.body as Provisioning.deprovision;
              break;
            default:
              return;
          }
          // Don't run this code is the operation is done, fallback to the simpler resource code.
          if (opBody.state === 'done') {
            return;
          }

          const resource = resources.find((res: RealResource) => opBody.resource_id === res.id);

          if (resource) {
            const product = productsResp.find(
              (prod: Catalog.Product): boolean => prod.id === resource.body.product_id
            );

            // Ignoring because we set `this.resource` to an empty array above
            // @ts-ignore
            this.resources.push({
              id: resource.id,
              label: resource.body.label,
              name: resource.body.name,
              logo: product && product.body.logo_url,
              status: ManifoldResourceList.opStateToStatus(operation),
            });
            return;
          }
          if (operation.body.type !== 'provision') {
            // Only provision operation without a resource should be processed
            return;
          }
          const product = productsResp.find(
            (prod: Catalog.Product): boolean =>
              prod.id === (opBody as Provisioning.provision).product_id
          );
          // Ignoring because we set `this.resource` to an empty array above
          // @ts-ignore
          this.resources.push({
            id: opBody.resource_id || '',
            // Only the provision operation has this info
            label: (opBody as Provisioning.provision).label || '',
            name: (opBody as Provisioning.provision).name || '',
            logo: product && product.body.logo_url,
            status: ManifoldResourceList.opStateToStatus(operation),
          });
        });

      // Then run through all the real resource and add them as available if they weren't added by an operation
      resources.forEach((resource: RealResource) => {
        // Ignoring because we set `this.resource` to an empty array above
        // @ts-ignore
        if (this.resources.find((res: FoundResource) => res.id === resource.id)) {
          return;
        }

        const product = productsResp.find(
          (prod: Catalog.Product): boolean => prod.id === resource.body.product_id
        );
        // Ignoring because we set `this.resource` to an empty array above
        // @ts-ignore
        this.resources.push({
          id: resource.id,
          label: resource.body.label,
          name: resource.body.name,
          logo: product && product.body.logo_url,
          status: 'available',
        });
      });

      this.resources.sort((a, b) => a.label.localeCompare(b.label));
    } else {
      this.resources = [];
    }
  }

  @logger()
  render() {
    if (Array.isArray(this.resources) && !this.resources.length) {
      return <slot name="no-resources" />;
    }

    return Array.isArray(this.resources) ? (
      <div class="wrapper">
        {this.resources.map(resource => (
          <manifold-resource-card-view
            label={resource.label}
            name={resource.name}
            logo={resource.logo}
            resource-id={resource.id}
            resource-status={resource.status}
            resource-link-format={this.resourceLinkFormat}
            preserve-event={this.preserveEvent}
          />
        ))}
      </div>
    ) : (
      <slot name="loading" />
    );
  }
}
Tunnel.injectProps(ManifoldResourceList, ['restFetch']);
