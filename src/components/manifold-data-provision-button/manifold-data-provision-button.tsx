import { h, Component, Prop, Element, State, Watch, Event, EventEmitter } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';

import connection from '../../state/connection';
import { GraphqlFetch } from '../../utils/graphqlFetch';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

interface ClickMessage {
  planId: string;
  productLabel: string;
  resourceLabel: string;
}

interface SuccessMessage {
  message: string;
  planId: string;
  productLabel: string;
  resourceId: string;
  resourceLabel: string;
}

interface InvalidMessage {
  message: string;
  planId: string;
  productLabel: string;
  resourceLabel: string;
}

interface ErrorMessage {
  message: string;
  planId: string;
  productLabel: string;
  resourceLabel: string;
}

// we only care if there are 2 or more regions
const planRegionsQuery = gql`
  query PLAN_REGIONS($planId: ID!) {
    plan(id: $planId) {
      regions(first: 2) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;

const profileIdQuery = gql`
  query PROFILE_ID {
    profile {
      id
    }
  }
`;

const productIdQuery = gql`
  query GET_PRODUCT_ID($productLabel: String!) {
    product(label: $productLabel) {
      id
    }
  }
`;

const createResourceMutation = gql`
  mutation CREATE_RESOURCE(
    $ownerId: ID!
    $planId: ID!
    $productId: ID!
    $regionId: ID!
    $resourceLabel: String!
  ) {
    createResource(
      input: {
        displayName: $resourceLabel
        label: $resourceLabel
        ownerId: $ownerId
        planId: $planId
        productId: $productId
        regionId: $regionId
      }
    ) {
      data {
        id
        label
      }
    }
  }
`;

@Component({ tag: 'manifold-data-provision-button' })
export class ManifoldDataProvisionButton {
  @Element() el: HTMLElement;
  /** _(hidden)_ */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  /** Product ID */
  @Prop({ mutable: true }) productId?: string = '';
  /** Product to provision (slug) */
  @Prop() productLabel?: string;
  /** Plan to provision (slug) */
  @Prop() planId?: string;
  /** The label of the resource to provision */
  @Prop() resourceLabel?: string;
  @Prop({ mutable: true }) ownerId?: string = '';
  /** Region to provision (ID) */
  @Prop({ mutable: true }) regionId?: string;
  @State() provisioning: boolean = false;
  @Event({ eventName: 'manifold-provisionButton-click', bubbles: true }) click: EventEmitter;
  @Event({ eventName: 'manifold-provisionButton-invalid', bubbles: true }) invalid: EventEmitter;
  @Event({ eventName: 'manifold-provisionButton-error', bubbles: true }) error: EventEmitter;
  @Event({ eventName: 'manifold-provisionButton-success', bubbles: true }) success: EventEmitter;

  @Watch('planId') planChange(newPlan: string) {
    if (newPlan) {
      this.updateRegions(newPlan);
    }
  }
  @Watch('productLabel') productChange(newProduct: string) {
    if (newProduct) {
      this.fetchProductId(newProduct);
    }
  }

  @loadMark()
  componentWillLoad() {
    // fetch product ID
    if (this.productLabel && !this.productId) {
      this.fetchProductId(this.productLabel);
    }
    // fetch owner ID
    if (!this.ownerId) {
      this.fetchProfileId();
    }
    // if resource missing, fetch (will only save if there’s only 1 region)
    if (this.planId && !this.regionId) {
      this.updateRegions(this.planId);
    }
  }

  async provision() {
    if (!this.graphqlFetch) {
      return;
    }

    if (!this.ownerId) {
      console.error('Property “ownerId” is missing');
      return;
    }

    const detail = {
      planId: this.planId as string,
      productLabel: this.productLabel as string,
      resourceLabel: this.resourceLabel as string,
    };

    // click event
    const clickMessage: ClickMessage = { ...detail };
    this.click.emit(clickMessage);

    // invalid event
    if (this.resourceLabel) {
      if (this.resourceLabel.length < 3) {
        const message: InvalidMessage = { ...detail, message: 'Must be at least 3 characters' };
        this.invalid.emit(message);
        return;
      }
      if (!this.validate(this.resourceLabel)) {
        const message: InvalidMessage = {
          ...detail,
          message:
            'Must start with a lowercase letter, and use only lowercase, numbers, and hyphens',
        };
        this.invalid.emit(message);
        return;
      }
    }

    // disable button & attempt provision
    this.provisioning = true;
    const { data, errors } = await this.graphqlFetch({
      query: createResourceMutation,
      variables: {
        ownerId: this.ownerId,
        planId: this.planId,
        productId: this.productId,
        regionId: this.regionId,
        resourceLabel: this.resourceLabel,
      },
    });
    this.provisioning = false;

    // success event
    if (data && data.data) {
      const success: SuccessMessage = {
        ...detail,
        message: `${data.data.label} successfully provisioned`,
        resourceId: data.data.id,
        resourceLabel: data.data.label,
      };
      this.success.emit(success);
    }

    // error event
    if (errors) {
      errors.forEach(({ message }) => {
        const e: ErrorMessage = { ...detail, message };
        this.error.emit(e);
      });
    }
  }

  async fetchProductId(productLabel: string) {
    if (!productLabel || !this.graphqlFetch) {
      return;
    }

    const { data } = await this.graphqlFetch({
      query: productIdQuery,
      variables: {
        productLabel,
      },
    });

    if (data && data.product) {
      this.productId = data.product.id;
    }
  }

  async fetchProfileId() {
    if (!this.graphqlFetch || this.ownerId) {
      return;
    }

    const { data } = await this.graphqlFetch({ query: profileIdQuery });

    if (data && data.profile) {
      this.ownerId = data.profile.id;
    }
  }

  async updateRegions(planId: string) {
    if (!this.graphqlFetch) {
      return;
    }

    const { data } = await this.graphqlFetch({
      query: planRegionsQuery,
      variables: {
        planId,
      },
    });

    if (data && data.plan && data.plan.regions) {
      // if a plan only has one region, use that
      if (data.plan.regions.edges.length === 1) {
        this.regionId = data.plan.regions.edges[0].node.id;
      }
    }
  }

  validate(input: string) {
    return /^[a-z][a-z0-9]*/.test(input);
  }

  @logger()
  render() {
    return (
      <button
        type="submit"
        onClick={() => this.provision()}
        disabled={!this.planId || !this.productId || !this.regionId || this.provisioning}
      >
        <slot />
      </button>
    );
  }
}
