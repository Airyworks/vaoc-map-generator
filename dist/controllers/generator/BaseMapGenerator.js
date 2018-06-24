"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.intToGridType = intToGridType;

var _Constants = require("../../Constants");

function intToGridType(x) {
  var bt = _Constants.GridType[x.toString()];

  return bt;
}