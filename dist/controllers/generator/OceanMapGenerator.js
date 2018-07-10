"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ocean = exports.OceanMapGenerator = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _BaseMapGenerator = require("./BaseMapGenerator");

var _generateFunc2 = require("./generateFunc");

var _Grid = require("src/models/Grid");

var _Constants = require("src/Constants");

var _populateFunc = require("./populateFunc");

var _models = require("src/models");

var OceanMapGenerator =
/*#__PURE__*/
function () {
  function OceanMapGenerator() {
    (0, _classCallCheck2.default)(this, OceanMapGenerator);
  }

  (0, _createClass2.default)(OceanMapGenerator, [{
    key: "generate",
    value: function generate(chunk) {
      var _generateFunc = (0, _generateFunc2.generateFunc)(5, chunk.side, 3, 0.3, chunk.noise, [1, 1, 0.3, 0.2, 0.2, 0.3], [1, 0.75, 0.33, 0.33, 0.33, 0.5]),
          terrain = _generateFunc.terrain,
          gridType = _generateFunc.gridType;

      for (var i = 0; i < chunk.side; i++) {
        for (var j = 0; j < chunk.side; j++) {
          var grid = new _Grid.Grid();
          grid.climate = chunk.climate;
          grid.gridType = (0, _BaseMapGenerator.intToGridType)(gridType[i][j]);
          grid.chunk = chunk;
          var type = _Constants.GridType.Sand;

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
      var x = (0, _populateFunc.populateFunc)(5, chunk.noise, chunk.side, [1, 4, 3, 6, 10]); // 1: CoconutTree, 2: Shell, 3: Fish, 4: JellyFish, 5: Starfish

      var entityIds = 0;

      for (var i = 0; i < x.length; i++) {
        for (var j = 0; j < x[i].length; j++) {
          if (!x[i][j]) {
            continue;
          }

          var gridType = chunk.grids[i][j].gridType; // tree not in water

          if (x[i][j] == 1 && gridType == _Constants.GridType.Water) {
            continue;
          } // not on Sand


          if ([2, 3, 4, 5].indexOf(x[i][j]) >= 0 && gridType == _Constants.GridType.Sand) {
            continue;
          }

          var entity = new _models.Entity();
          entity.entityId = entityIds++;
          entity.type = x[i][j] == 1 ? _Constants.EntityType.CoconutTree : x[i][j] == 2 ? _Constants.EntityType.Shell : x[i][j] == 3 ? _Constants.EntityType.Fish : x[i][j] == 4 ? _Constants.EntityType.Jellyfish : _Constants.EntityType.Starfish;
          chunk.grids[i][j].appendix = entity;
        }
      }
    }
  }]);
  return OceanMapGenerator;
}();

exports.OceanMapGenerator = OceanMapGenerator;
var ocean = new OceanMapGenerator();
exports.ocean = ocean;