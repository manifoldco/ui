namespace Manifold {
  export interface ManifoldNode {
    id: string;
    body: object;
    type: string;
    version: number;
  }

  export interface ProviderBody {
    label: string;
  }

  export interface ProductBody {
    label: string;
    provider_id: string;
    tags: string[];
  }

  export interface PlanBody {
    label: string;
    product_id: string;
    cost: number;
  }

  export interface RegionBody {
    location: string;
    platform: string;
  }
}
