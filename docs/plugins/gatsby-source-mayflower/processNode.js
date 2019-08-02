module.exports = (node, method, api, endpoint, createNodeId, createContentDigest) => ({
  id: createNodeId(node.id),
  parent: null,
  children: [],
  mediaType: 'application/json',
  data: node,
  internal: {
    type: `${method}${api.charAt(0).toUpperCase() + api.slice(1)}${endpoint
      .charAt(0)
      .toUpperCase() + endpoint.slice(1)}`,
    content: JSON.stringify(node.body || node),
    contentDigest: createContentDigest(node.body || node),
  },
});
