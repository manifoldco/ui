import { h, Component, Prop, State, Event, EventEmitter, Element } from '@stencil/core';

import { Marketplace } from '../../types/marketplace';
import Tunnel from '../../data/connection';
import { RestFetch } from '../../utils/restFetch';

interface EventDetail {
  ownerId?: string;
  resourceId: string;
  resourceLabel: string;
  resourceName: string;
}

interface RealResource extends Marketplace.Resource {
  body: RealResourceBody;
}

interface RealResourceBody extends Marketplace.ResourceBody {
  team_id?: string;
  user_id?: string;
}

@Component({ tag: 'manifold-data-resource-list' })
export class ManifoldDataResourceList {
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
  @State() resources?: Marketplace.Resource[];
  @Event({ eventName: 'manifold-resourceList-click', bubbles: true }) clickEvent: EventEmitter;

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

  fetchResources = async () => {
    if (!this.restFetch) {
      return;
    }

    const response = await this.restFetch<Marketplace.Resource[]>({
      service: 'marketplace',
      endpoint: `/resources/?me`,
    });

    if (response instanceof Error) {
      console.error(response);
      return;
    }

    if (Array.isArray(response)) {
      this.resources = this.userResources(
        [...response].sort((a, b) => a.body.label.localeCompare(b.body.label))
      );
    }
  };

  handleClick(resource: Marketplace.Resource, e: Event) {
    if (!this.resourceLinkFormat || this.preserveEvent) {
      e.preventDefault();
      const detail: EventDetail = {
        resourceId: resource.id,
        resourceLabel: resource.body.label,
        resourceName: resource.body.name,
        ownerId: resource.body.owner_id,
      };
      this.clickEvent.emit(detail);
    }
  }

  formatLink(resource: Marketplace.Resource) {
    if (!this.resourceLinkFormat) {
      return undefined;
    }
    return this.resourceLinkFormat.replace(/:resource/gi, resource.body.label);
  }

  userResources(resources: RealResource[]) {
    return resources.filter(
      ({ body: { owner_id, user_id } }) =>
        user_id || (owner_id && owner_id.indexOf('/user/') !== -1)
    );
  }

  render() {
    if (!Array.isArray(this.resources)) {
      return null;
    }

    return (
      <ul>
        {this.resources.map(resource => (
          <li>
            <a href={this.formatLink(resource)} onClick={e => this.handleClick(resource, e)}>
              {resource.body.name}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}
Tunnel.injectProps(ManifoldDataResourceList, ['restFetch']);
