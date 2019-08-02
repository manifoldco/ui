const fetch = require('node-fetch');
const processNode = require('./processNode');
const relations = require('./relations');

/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }, configOptions) => {
  const { createNode } = actions;
  const { sources } = configOptions;

  if (!sources) {
    console.error('No api source configured, please add one source in the plugin configuration');
  }

  const apis = {};
  // Go through all the configured sources and process them in a well formed format
  sources.forEach(({ source, name, endpoints }) => {
    if (!endpoints) {
      return;
    }

    if (!name) {
      console.error(`Source ${source} does not have a name, the name is required`);
      return;
    }

    apis[name] = [];

    endpoints.forEach(obj => {
      // If processing a non object endpoint
      if (typeof obj === 'string') {
        apis[name].push({
          name: obj,
          path: `${source}/${obj}/`,
          method: 'get',
        });
        return;
      }

      // Otherwise, extract stuff
      const { endpoint, method, params, ...rest } = obj;

      // For each endpoint, generate the base path
      const path = new URL(`${source}/${endpoint}/`);

      if (params) {
        // Ad the query params if any
        Object.keys(params).forEach(param => {
          const pathParams = path.searchParams;
          pathParams.set(param, params[param]);
        });
      }

      apis[name].push({
        name: endpoint,
        path,
        method: method || 'get',
        ...rest,
      });
    });

    // TODO: Make this sorting less dumb, the idea is to have endpoints with requirements be fetched last
    apis[name].sort((element1, element2) => {
      if (element1 === element2) {
        return 0;
      }
      return element1.requires ? 1 : -1;
    });
  });

  const results = {};
  // Start fetching the results for each API
  for (const api in apis) {
    if (!apis.hasOwnProperty(api)) {
      break;
    }

    results[api] = {};

    // For each formatted endpoint, start the fetch
    for (const index in apis[api]) {
      if (!apis[api].hasOwnProperty(index)) {
        break;
      }

      const endpoint = apis[api][index];

      // If this endpoint has requirements, add the parameters as needed
      if (endpoint.requires) {
        Object.keys(endpoint.requires).forEach(requirement => {
          const req = endpoint.requires[requirement];
          const base = results[api][requirement];

          if (!base) {
            return;
          }

          base.forEach(obj => {
            if (!obj.entity[req.field]) {
              return;
            }

            const pathParams = endpoint.path.searchParams;
            pathParams.append(req.param, obj.entity[req.field]);
          });
        });
      }

      // Fetch all the records in one go
      // eslint-disable-next-line no-await-in-loop
      const entities = await fetch(endpoint.path.toString(), {
        method: endpoint.method,
        headers: endpoint.headers,
        body: endpoint.body,
      }).then(response => response.json());

      results[api][endpoint.name] = entities.map(entity => ({
        entity,
        endpoint,
        processed: processNode(
          entity,
          endpoint.method,
          api,
          endpoint.name,
          createNodeId,
          createContentDigest
        ),
      }));
    }

    // Process the relationships
    relations.processRelationships(results[api]);

    // Create the nodes for that API
    Object.keys(results[api]).forEach(key =>
      results[api][key].forEach(entity => createNode(entity.processed))
    );
  }
};
