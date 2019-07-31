import { h, Component, Prop, State, Element, Watch } from '@stencil/core';

import { Marketplace } from '../../types/marketplace';
import { Catalog } from '../../types/catalog';
import { Provisioning } from '../../types/provisioning';
import Tunnel from '../../data/connection';
import { RestFetch } from '../../utils/restFetch';

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

    const resourcesResp = await this.restFetch<Marketplace.Resource[]>({
      service: 'marketplace',
      endpoint: `/resources/?me`,
    });

    if (resourcesResp instanceof Error) {
      console.error(resourcesResp);
      return;
    }

    if (Array.isArray(resourcesResp)) {
      const productsResp = await this.restFetch<Catalog.Product[]>({
        service: 'catalog',
        endpoint: `/products`,
      });

      if (productsResp instanceof Error) {
        return;
      }

      const operationsResp = await this.restFetch<Provisioning.Operation[]>({
        service: 'provisioning',
        endpoint: `/operations/?is_deleted=false`,
      });

      if (operationsResp instanceof Error) {
        console.error(operationsResp);
        return;
      }

      this.resources = ManifoldResourceList.userResources(
        [...resourcesResp].sort((a, b) => a.body.label.localeCompare(b.body.label))
      ).map(
        (resource: Marketplace.Resource): FoundResource => {
          const product = productsResp.find(
            (prod: Catalog.Product): boolean => prod.id === resource.body.product_id
          );
          const operation = operationsResp
            .filter((op: Provisioning.Operation) =>
              ['provision', 'resize', 'transfer', 'deprovision'].includes(op.body.type)
            )
            .find((op: Provisioning.Operation) => {
              switch (op.body.type) {
                case 'provision':
                  return (op.body as Provisioning.provision).resource_id === resource.id;
                case 'resize':
                  return (op.body as Provisioning.resize).resource_id === resource.id;
                case 'transfer':
                  return (op.body as Provisioning.transfer).resource_id === resource.id;
                case 'deprovision':
                  return (op.body as Provisioning.deprovision).resource_id === resource.id;
                default:
                  return false;
              }
            });

          return {
            id: resource.id,
            label: resource.body.label,
            name: resource.body.name,
            logo: product && product.body.logo_url,
            status: operation ? ManifoldResourceList.opStateToStatus(operation) : 'available',
          };
        }
      );
    } else {
      this.resources = [];
    }
  }

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
