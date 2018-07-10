"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tropical = exports.TropicalMapGenerator = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _BaseMapGenerator = require("./BaseMapGenerator");

var _generateFunc2 = require("./generateFunc");

var _Grid = require("src/models/Grid");

var _Constants = require("src/Constants");

var _models = require("src/models");

var _populateFunc = require("./populateFunc");

var TropicalMapGenerator =
/*#__PURE__*/
function () {
  function TropicalMapGenerator() {
    (0, _classCallCheck2.default)(this, TropicalMapGenerator);
  }

  (0, _createClass2.default)(TropicalMapGenerator, [{
    key: "generate",
    value: function generate(chunk) {
      var _generateFunc = (0, _generateFunc2.generateFunc)(5, chunk.side, 1, 0.3, chunk.noise, [1, 0.6, 0.4, 0.2, 0.06, 0.03], [1, 0.75, 0.33, 0.33, 0.33, 0.5]),
          terrain = _generateFunc.terrain,
          gridType = _generateFunc.gridType;

      for (var i = 0; i < chunk.side; i++) {
        for (var j = 0; j < chunk.side; j++) {
          var grid = new _Grid.Grid();
          grid.climate = chunk.climate;
          grid.gridType = (0, _BaseMapGenerator.intToGridType)(gridType[i][j]);
          grid.chunk = chunk;
          var type = _Constants.GridType.Dirt;

          if (terrain[i][j] < 0) {
            // is water
            type = _Constants.GridType.Water;
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
      var x = (0, _populateFunc.populateFunc)(2, chunk.noise, chunk.side, [1, 4]); // 1: Tree, 2: Snake

      var entityIds = 0;

      for (var i = 0; i < x.length; i++) {
        for (var j = 0; j < x[i].length; j++) {
          if (!x[i][j]) {
            continue;
          }

          var gridType = chunk.grids[i][j].gridType; // nothing in water

          if (x[i][j] > 0 && gridType == _Constants.GridType.Water) {
            continue;
          }

          var entity = new _models.Entity();
          entity.entityId = entityIds++;
          entity.type = x[i][j] == 1 ? _Constants.EntityType.Tree : _Constants.EntityType.Snake;
          chunk.grids[i][j].appendix = entity;
        }
      }
    }
  }]);
  return TropicalMapGenerator;
}();

exports.TropicalMapGenerator = TropicalMapGenerator;
var tropical = new TropicalMapGenerator();
exports.tropical = tropical;