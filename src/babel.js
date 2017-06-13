/**
 * [description]
 * @param {[type]} options.types: t [description]
 * @param {[type]} options.template [description]
 * @return {[type]} [description]
 */
export default function({ types: t, template }) {
  const hocTemplate = template(`HOC(__filename)(MODULE)`);

  return {
    visitor: {
      Program(path, programState) {
        const state = {
          hasCssImport: false,
        };
        // Check if file has any CSS import
        path.traverse(
          {
            ImportDeclaration(path, state) {
              const source = path.node.source.value;
              if (source.match(/(\.css)$/) != null) {
                state.hasCssImport = true;
              }
            },
          },
          state
        );

        // Check for React Class
        path.traverse({
          ClassDeclaration(path) {
            let bindingName = path.node.id.name;
            let binding = path.scope.getBinding(bindingName);

            binding.referencePaths.forEach(path => {
              if (!path.isIdentifier()) {
                return;
              }
              const exportParent = path.find(
                path =>
                  path.isExportDefaultDeclaration() ||
                  path.isExportNamedDeclaration()
              );
              if (exportParent != null) {
                let hoc = hocTemplate({
                  HOC: programState.addImport(
                    "react-with-css",
                    "default",
                    "withCSS"
                  ),
                  MODULE: path.node,
                }).expression;
                path.replaceWith(hoc);
              }
            });
          },
        });
      },
    },
  };
}
