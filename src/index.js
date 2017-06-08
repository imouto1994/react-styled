import React from "react";

let styledComponentFileNamesSet = {};

export default function withStyles(fileName) {
  return function (Component) {
    return function WithStyles(props) {
      styledComponentFileNamesSet[fileName] = 1;
      return <Component { ...props } />;
    };
  };
}

export function flushStyledComponentFileNames() {
  const fileNames = Object.keys(styledComponentFileNamesSet);
  styledComponentFileNamesSet = {};
  return fileNames;
}
