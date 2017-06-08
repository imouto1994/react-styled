"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types,
      template = _ref.template;

  var hocTemplate = template("HOC(__filename)(MODULE)");

  return {
    visitor: {
      Program: function Program(path, programState) {
        var state = {
          hasCssImport: false
        };
        // Check if file has any CSS import
        path.traverse({
          ImportDeclaration: function ImportDeclaration(path, state) {
            var source = path.node.source.value;
            if (source.match(/(\.css)$/) != null) {
              state.hasCssImport = true;
            }
          }
        }, state);

        // Check for React Class
        path.traverse({
          ClassDeclaration: function ClassDeclaration(path) {
            var bindingName = path.node.id.name;
            var binding = path.scope.getBinding(bindingName);

            binding.referencePaths.forEach(function (path) {
              if (!path.isIdentifier()) {
                return;
              }
              var exportParent = path.find(function (path) {
                return path.isExportDefaultDeclaration() || path.isExportNamedDeclaration();
              });
              if (exportParent != null) {
                var hoc = hocTemplate({
                  HOC: programState.addImport("withStyles", "default", "withStyles"),
                  MODULE: path.node
                }).expression;
                path.replaceWith(hoc);
              }
            });
          }
        });
      }
    }
  };
};