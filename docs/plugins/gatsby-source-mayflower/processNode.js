module.exports = ({
  entity,
  method,
  api,
  duration,
  endpoint,
  createNodeId,
  createContentDigest,
}) => ({
  id: createNodeId(entity.id),
  parent: null,
  children: [],
  mediaType: 'application/json',
  data: entity,
  requestDuration: duration,
  internal: {
    type: `${method}${api.charAt(0).toUpperCase() + api.slice(1)}${endpoint
      .charAt(0)
      .toUpperCase() + endpoint.slice(1)}`,
    contentDigest: createContentDigest(entity.body || entity),
  },
});
