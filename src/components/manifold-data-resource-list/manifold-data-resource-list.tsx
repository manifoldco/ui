import { Component, Prop, State, Event, EventEmitter, Element } from '@stencil/core';
import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';

interface EventDetail {
  ownerId?: string;
  resourceId: string;
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
  @Prop() connection: Connection = connections.prod; // Provided by manifold-connection
  /** Link format structure, with `:resource` placeholder */
  @Prop() linkFormat?: string;
  /** Should the JS event still fire, even if link-format is passed?  */
  @Prop() preserveEvent: boolean = false;
  @State() resources?: Marketplace.Resource[];
  @Event({ eventName: 'manifold-resourceList-click', bubbles: true }) clickEvent: EventEmitter;

  componentWillLoad() {
    // Don’t return this promise to invoke the loading state
    fetch(`${this.connection.marketplace}/resources/?me`, withAuth())
      .then(response => response.json())
      .then((resources: Marketplace.Resource[]) => {
        this.resources = this.userResources(
          [...resources].sort((a, b) => a.body.label.localeCompare(b.body.label))
        );
      });
  }

  handleClick(resource: Marketplace.Resource, e: Event) {
    if (!this.linkFormat || this.preserveEvent) {
      e.preventDefault();
      const detail: EventDetail = {
        resourceId: resource.id,
        resourceName: resource.body.label,
        ownerId: resource.body.owner_id,
      };
      this.clickEvent.emit(detail);
    }
  }

  formatLink(resource: Marketplace.Resource) {
    if (!this.linkFormat) return undefined;
    return this.linkFormat.replace(/:resource/gi, resource.body.label);
  }

  userResources(resources: RealResource[]) {
    return resources.filter(
      ({ body: { owner_id, user_id } }) =>
        user_id || (owner_id && owner_id.indexOf('/user/') !== -1)
    );
  }

  render() {
    if (!Array.isArray(this.resources)) {
      return <slot />;
    }

    return (
      <ul>
        {this.resources.map(resource => (
          <li>
            <a href={this.formatLink(resource)} onClick={e => this.handleClick(resource, e)}>
              {resource.body.label}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}
Tunnel.injectProps(ManifoldDataResourceList, ['connection']);
