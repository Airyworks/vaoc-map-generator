"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Grid = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Grid = function Grid() {
  (0, _classCallCheck2.default)(this, Grid);
  (0, _defineProperty2.default)(this, "climate", void 0);
  (0, _defineProperty2.default)(this, "terrain", void 0);
  (0, _defineProperty2.default)(this, "gridId", void 0);
  (0, _defineProperty2.default)(this, "x", void 0);
  (0, _defineProperty2.default)(this, "y", void 0);
  (0, _defineProperty2.default)(this, "chunk", void 0);
  (0, _defineProperty2.default)(this, "gridType", void 0);
  (0, _defineProperty2.default)(this, "surface", void 0);
  (0, _defineProperty2.default)(this, "appendix", void 0);
  (0, _defineProperty2.default)(this, "passable", true);
  this.gridId = Grid.id++;
};

exports.Grid = Grid;
(0, _defineProperty2.default)(Grid, "id", 0);