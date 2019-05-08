const path = require('path');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const component = path.resolve('src/pages/index.tsx');

  return graphql(`
    {
      allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___path] }, limit: 1000) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    return result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component,
      });
    });
  });
};
