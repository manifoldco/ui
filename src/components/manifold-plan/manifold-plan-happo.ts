import planPaid from '../../spec/mock/graphql/plan-paid';
import planFree from '../../spec/mock/graphql/plan-free';
import connection from '../../state/connection';
import { GraphqlFetch } from '../../utils/graphqlFetch';

export const skeleton = async () => {
  const conn = document.createElement('manifold-connection');
  document.body.appendChild(conn);

  const selector = document.createElement('manifold-plan');
  selector.planId = planPaid.id;

  const mockGqlFetch = (async (...args) => {
    // Simulate a delay so we see the skeletons
    await new Promise(resolve => setTimeout(resolve, 1000));
    return connection.graphqlFetch(...args);
  }) as GraphqlFetch;

  selector.graphqlFetch = mockGqlFetch;
  selector.hideUntilReady = true;

  document.body.appendChild(selector);

  await selector.componentOnReady();
};

export const freePlan = async () => {
  const conn = document.createElement('manifold-connection');
  document.body.appendChild(conn);

  const selector = document.createElement('manifold-plan');
  selector.planId = planFree.id;
  selector.hideUntilReady = true;

  document.body.appendChild(selector);

  await selector.componentOnReady();
};

export const paidPlan = async () => {
  const conn = document.createElement('manifold-connection');
  document.body.appendChild(conn);

  const selector = document.createElement('manifold-plan');
  selector.planId = planPaid.id;
  selector.hideUntilReady = true;

  document.body.appendChild(selector);

  await selector.componentOnReady();
};
