import { UserFeatures } from 'types/UserFeatures';
import { Connection } from './connections';

interface PlanCostOptions {
  planID: string;
  features: UserFeatures;
  init: RequestInit;
}

export function planCost(
  connection: Connection,
  { planID, features, init }: PlanCostOptions
): Promise<Gateway.Price> {
  return fetch(`${connection.gateway}/id/plan/${planID}/cost`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ features }),
    ...init,
  }).then(response => response.json());
}
