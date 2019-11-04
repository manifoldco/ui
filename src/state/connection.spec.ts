import { ConnectionState } from './connection';

describe('connection state', () => {
  it('notifies subscribers of auth token changes', () => {
    const state = new ConnectionState();
    state.authToken = 'old-token';
    const subscriber = jest.fn();
    state.subscribe(subscriber);
    state.setAuthToken('new-token');
    expect(subscriber).toHaveBeenCalledWith('new-token');
  });

  it('will not notify after unsubscribing', () => {
    const state = new ConnectionState();
    state.authToken = 'old-token';
    const subscription = jest.fn();
    const unsubscribe = state.subscribe(subscription);
    state.setAuthToken('new-token');
    unsubscribe();
    state.setAuthToken('old-token');
    expect(subscription.mock.calls).toHaveLength(1);
  });
});
