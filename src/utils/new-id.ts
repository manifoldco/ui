import { base32Encode } from '@ctrl/ts-base32';

type IDType = 'resource' | 'operation';

function getType(typeStr: IDType): Uint8Array {
  if (typeStr === 'resource') return new Uint8Array([0x01, 0x90]);
  if (typeStr === 'operation') return new Uint8Array([0x01, 0x2c]);

  throw new Error(`invalid type ${typeStr}`);
}

export default function newID(typeStr: IDType): string {
  const typ = getType(typeStr);
  const id = new Uint8Array(18);

  id[0] = 0x10 | typ[0]; // eslint-disable-line no-bitwise
  id[1] = typ[1]; // eslint-disable-line prefer-destructuring
  id.set(crypto.getRandomValues(new Uint8Array(16)), 2);

  return base32Encode(id, 'Crockford', { padding: false });
}
