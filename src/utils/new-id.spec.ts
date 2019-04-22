import nodeCrypto from 'crypto';
import newID from './new-id';

// Polyfill crypto
const globalAny: any = global;
globalAny.crypto = {
  getRandomValues(buffer: Uint8Array) {
    return nodeCrypto.randomFillSync(buffer);
  },
};

describe('newID method', () => {
  it('can create new IDs for resources', () => {
    expect(newID('resource')).toHaveLength(29);
  });

  it('can create new IDs from operations', () => {
    expect(newID('operation')).toHaveLength(29);
  });
});
