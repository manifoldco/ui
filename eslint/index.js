module.exports.rules = {
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

            const name = tag.value.value;
            if (!name.startsWith('manifold-')) {
              context.report({
                node,
                message: `Component ${tag.value.value} should be prefixed with 'manifold-'`,
              });
            }
          }
        }
      },
    }),
  },
};
