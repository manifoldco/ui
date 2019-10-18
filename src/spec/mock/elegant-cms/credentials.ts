import { ResourceCredentialsQuery } from '../../../types/graphql';

const credentials: ResourceCredentialsQuery['resource']['credentials']['edges'] = [
  {
    node: {
      key: 'JWT_API_KEY',
      value: 'HEAVILY-REDACTED',
    },
  },
];
export default credentials;
