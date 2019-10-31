import { gql } from '@manifoldco/gql-zero';

export default gql`
  id
  displayName
  label
  free
  cost
  fixedFeatures(first: 25) {
    edges {
      node {
        displayName
        displayValue
        label
      }
    }
  }
  meteredFeatures(first: 25) {
    edges {
      node {
        label
        displayName
        numericDetails {
          unit
          costTiers {
            limit
            cost
          }
        }
      }
    }
  }
  configurableFeatures(first: 25) {
    edges {
      node {
        label
        displayName
        type
        options {
          displayName
          displayValue
          label
        }
        numericDetails {
          increment
          min
          max
          unit
          costTiers {
            limit
            cost
          }
        }
      }
    }
  }
  regions(first: 25, orderBy: { field: DISPLAY_NAME, direction: ASC }) {
    edges {
      node {
        id
        displayName
        platform
        dataCenter
      }
    }
  }
`;
