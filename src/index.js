import React from "react";

let styledComponentFileNamesSet = {};

/**
 * [withStyles description]
 * @param {[type]} fileName [description]
 * @return {[type]} [description]
 */
export default function withStyles(fileName) {
  return function(Component) {
    return function WithStyles(props) {
      styledComponentFileNamesSet[fileName] = 1;
      return <Component {...props} />;
    };
  };
}

/**
 * [flushStyledComponentFileNames description]
 * @return {[type]} [description]
 */
export function flushStyledComponentFileNames() {
  const fileNames = Object.keys(styledComponentFileNamesSet);
  styledComponentFileNamesSet = {};
  return fileNames;
}
