exports.processRelationships = apis => {
  Object.keys(apis).forEach(key => {
    const entities = apis[key];
    entities.forEach(entity => {
      if (entity.endpoint.relationships) {
        Object.keys(entity.endpoint.relationships).forEach(relationKey => {
          const relation = entity.endpoint.relationships[relationKey];

          let field = null;
          if (entity.entity.body) {
            field = entity.entity.body[relation];
          } else {
            field = entity.entity[relation];
          }

          const relatedObject = apis[relationKey].find(object => object.entity.id === field);

          if (relatedObject) {
            // Add the children relation
            entity.processed[`${relationKey}___NODE`] = relatedObject.processed.id;

            // Add or create the parent relation
            if (!relatedObject.processed[`${key}___NODE`]) {
              relatedObject.processed[`${key}___NODE`] = [];
            }
            relatedObject.processed[`${key}___NODE`].push(entity.processed.id);
          }
        });
      }
    });
  });
};
