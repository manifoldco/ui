module.exports.rules = {
  'restrict-required-props': {
    create: context => ({
      ClassProperty(node) {
        const decorators = node.decorators || [];
        const prop = decorators.find(d => d.expression.callee.name === 'Prop');

        if (prop) {
          const allowedTypes = ['TSBooleanKeyword', 'TSStringKeyword'];
          if (
            !node.optional &&
            !node.value &&
            !allowedTypes.includes(node.typeAnnotation.typeAnnotation.type)
          ) {
            context.report({
              node,
              message: `The property ${
                node.key.name
              } must either be optional or have a default value assigned. Only properties that can be set from HTML attributes should be required unless default values are provided (only booleans and strings can be set via attributes).`,
            });
          }
        }
      },
    }),
  },
  'stencil-component-prefix': {
    create: context => ({
      ExportNamedDeclaration(node) {
        if (node.declaration.type === 'ClassDeclaration') {
          const decorators = node.declaration.decorators || [];
          const component = decorators.find(d => d.expression.callee.name === 'Component');
          if (component) {
            const tag = component.expression.arguments[0].properties.find(
              p => p.key.name === 'tag'
            );

            if (tag) {
              const name = tag.value.value;
              if (!name.startsWith('manifold-')) {
                context.report({
                  node,
                  message: `Component ${name} should be prefixed with 'manifold-'`,
                });
              }
            }
          }
        }
      },
    }),
  },
};
