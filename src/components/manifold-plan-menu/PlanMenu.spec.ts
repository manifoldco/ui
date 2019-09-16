import { isConfigurable, getMeteredCost, sortPlans } from './PlanMenu';
import { Plan, PlanEdge } from '../../types/graphql';

const mockFreePlan: Partial<Plan> = {
  id: 'free',
  cost: 0,
  free: true,
};
const mockPaidPlan: Partial<Plan> = {
  id: 'paid',
  cost: 1000,
  free: false,
};
const mockMeteredPlan: any = {
  id: 'metered',
  cost: 0,
  free: false,
  meteredFeatures: {
    edges: [
      {
        node: { displayName: 'Metered Feature', numericDetails: { costTiers: [{ cost: 250000 }] } },
      },
    ],
  },
  configurableFeatures: { edges: [] },
};

const mockConfigurablePlan = {
  id: 'configurable',
  cost: 500,
  free: false,
  configurableFeatures: {
    edges: [{ node: { displayName: 'Configurable Feature' } }],
  },
};

const mockPlans = [
  { node: mockMeteredPlan },
  { node: mockFreePlan },
  { node: mockConfigurablePlan },
  { node: mockPaidPlan },
];

describe('isConfigurable', () => {
  it('returns `true` when a plan has configurable features.', () => {
    const result = isConfigurable(mockConfigurablePlan as Plan);
    expect(result).toBe(true);
  });
  it('returns `false` when a plan has NO configurable features.', () => {
    const result = isConfigurable(mockMeteredPlan as Plan);
    expect(result).toBe(false);
  });
  it('returns `undefined` when features cannot be determnined.', () => {
    const result = isConfigurable(mockPaidPlan as Plan);
    expect(result).toBe(undefined);
  });
});

describe('getMeteredCost', () => {
  it('returns 0 when there are no metered features.', () => {
    const result = getMeteredCost(mockPaidPlan as Plan);
    expect(result).toBe(0);
  });
  it('returns a sum of metered features at the lowest cost tier.', () => {
    const result = getMeteredCost(mockMeteredPlan as Plan);
    expect(result).toBe(25);
  });
});

describe('sortPlans', () => {
  it('sorts all plans in ascending cost order.', () => {
    const result = sortPlans(mockPlans as PlanEdge[]);
    expect(result.map(plan => plan.node.id)).toEqual([
      mockFreePlan.id,
      mockMeteredPlan.id,
      mockPaidPlan.id,
      mockConfigurablePlan.id,
    ]);
  });
});
