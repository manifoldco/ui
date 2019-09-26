import { h, FunctionalComponent } from '@stencil/core';
import { GraphqlError } from '../../utils/graphqlFetch';

interface ErrorProps {
  errors?: GraphqlError[];
}

export const Error: FunctionalComponent<ErrorProps> = ({ errors }) => {
  if (errors) {
    errors.map(({ message }) => <manifold-toast alertType="error">{message}</manifold-toast>);
  }

  return [];
};
