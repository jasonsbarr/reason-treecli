// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Fs = require("fs");
var List = require("bs-platform/lib/js/list.js");
var Path = require("path");
var $$Array = require("bs-platform/lib/js/array.js");
var $$String = require("bs-platform/lib/js/string.js");

function getAbsolutePath(path) {
  return Path.resolve(__dirname, path);
}

function padText(padding, text) {
  return $$String.make(padding, /* " " */32) + text;
}

function filterItemsList(ignore, itemsList) {
  if (ignore !== undefined) {
    var nameToIgnore = ignore;
    return List.filter((function (item) {
                    if (item.isDirectory()) {
                      return item.name !== nameToIgnore;
                    } else {
                      return true;
                    }
                  }))(itemsList);
  } else {
    return itemsList;
  }
}

function printDir(padding, ignore, dir) {
  var absPath = Path.resolve(__dirname, dir);
  var options = {
    withFileTypes: true
  };
  return List.iter((function (item) {
                if (item.isDirectory()) {
                  console.log(padText(padding, "📁" + (" " + item.name)));
                  return printDir(padding + 1 | 0, ignore, absPath + ("/" + item.name));
                } else {
                  console.log(padText(padding, "🗎" + (" " + item.name)));
                  return /* () */0;
                }
              }), filterItemsList(ignore, $$Array.to_list(Fs.readdirSync(absPath, options))));
}

exports.getAbsolutePath = getAbsolutePath;
exports.padText = padText;
exports.filterItemsList = filterItemsList;
exports.printDir = printDir;
/* fs Not a pure module */
