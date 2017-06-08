"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = withStyles;
exports.flushStyledComponentFileNames = flushStyledComponentFileNames;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var styledComponentFileNamesSet = {};

/**
 * [withStyles description]
 * @param {[type]} fileName [description]
 * @return {[type]} [description]
 */
function withStyles(fileName) {
  return function(Component) {
    return function WithStyles(props) {
      styledComponentFileNamesSet[fileName] = 1;
      return _react2.default.createElement(Component, props);
    };
  };
}

/**
 * [flushStyledComponentFileNames description]
 * @return {[type]} [description]
 */
function flushStyledComponentFileNames() {
  var fileNames = Object.keys(styledComponentFileNamesSet);
  styledComponentFileNamesSet = {};
  return fileNames;
}
