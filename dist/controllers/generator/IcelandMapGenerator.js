"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iceland = exports.IcelandMapGenerator = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _BaseMapGenerator = require("./BaseMapGenerator");

var _generateFunc2 = require("./generateFunc");

var _Grid = require("src/models/Grid");

var _Constants = require("src/Constants");

var _populateFunc = require("./populateFunc");

var _models = require("src/models");

var IcelandMapGenerator =
/*#__PURE__*/
function () {
  function IcelandMapGenerator() {
    (0, _classCallCheck2.default)(this, IcelandMapGenerator);
  }

  (0, _createClass2.default)(IcelandMapGenerator, [{
    key: "generate",
    value: function generate(chunk) {
      var _generateFunc = (0, _generateFunc2.generateFunc)(5, chunk.side, 3, 0.05, chunk.noise, [1, 1, 0.3, 0.2, 0.2, 0.3], [1, 0.75, 0.33, 0.33, 0.33, 0.5]),
          terrain = _generateFunc.terrain,
          gridType = _generateFunc.gridType;

      for (var i = 0; i < chunk.side; i++) {
        for (var j = 0; j < chunk.side; j++) {
          var grid = new _Grid.Grid();
          grid.climate = chunk.climate;
          grid.gridType = (0, _BaseMapGenerator.intToGridType)(gridType[i][j]);
          grid.chunk = chunk;
          var type = gridType[i][j] <= 4 ? _Constants.GridType.Snowland : _Constants.GridType.Stone;

          if (terrain[i][j] < 0) {
            // is water
            type = _Constants.GridType.Ice;
          }

          grid.gridType = type;
          grid.terrain = terrain[i][j];
          grid.x = i;
          grid.y = j;

          if (chunk.grids[i] === undefined) {
            chunk.grids[i] = [];
          }

          chunk.grids[i][j] = grid;
        }
      }
    }
  }, {
    key: "populate",
    value: function populate(chunk) {
      var x = (0, _populateFunc.populateFunc)(2, chunk.noise, chunk.side, [16, 12]); // 1: SnowHouse, 2: BrokenBoard

      var entityIds = 0;

      for (var i = 0; i < x.length; i++) {
        for (var j = 0; j < x[i].length; j++) {
          if (!x[i][j]) {
            continue;
          }

          var gridType = chunk.grids[i][j].gridType; // nothing in water

          if (x[i][j] > 0 && gridType == _Constants.GridType.Ice) {
            continue;
          }

          var entity = new _models.Entity();
          entity.entityId = entityIds++;
          entity.type = x[i][j] == 1 ? _Constants.EntityType.SnowHouse : _Constants.EntityType.BrokenBoard;
          chunk.grids[i][j].appendix = entity;
        }
      }
    }
  }]);
  return IcelandMapGenerator;
}();

exports.IcelandMapGenerator = IcelandMapGenerator;
var iceland = new IcelandMapGenerator();
exports.iceland = iceland;