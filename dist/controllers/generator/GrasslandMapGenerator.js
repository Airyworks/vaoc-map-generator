"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.grassland = exports.GrasslandMapGenerator = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _BaseMapGenerator = require("./BaseMapGenerator");

var _generateFunc2 = require("./generateFunc");

var _Grid = require("src/models/Grid");

var _Constants = require("src/Constants");

var _populateFunc = require("./populateFunc");

var _models = require("src/models");

var GrasslandMapGenerator =
/*#__PURE__*/
function () {
  function GrasslandMapGenerator() {
    (0, _classCallCheck2.default)(this, GrasslandMapGenerator);
  }

  (0, _createClass2.default)(GrasslandMapGenerator, [{
    key: "generate",
    value: function generate(chunk) {
      var _generateFunc = (0, _generateFunc2.generateFunc)(5, chunk.side, 0.3, 0.62, chunk.noise, [1, 0.6, 0.3, 0.2, 0.06, 0.03], [1, 0.75, 0.33, 0.33, 0.33, 0.5]),
          terrain = _generateFunc.terrain,
          gridType = _generateFunc.gridType;

      for (var i = 0; i < chunk.side; i++) {
        for (var j = 0; j < chunk.side; j++) {
          var grid = new _Grid.Grid();
          grid.climate = chunk.climate;
          grid.gridType = (0, _BaseMapGenerator.intToGridType)(gridType[i][j]);
          grid.chunk = chunk;
          var type = gridType[i][j] <= 4 ? _Constants.GridType.Dirt : _Constants.GridType.Stone;

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
      var x = (0, _populateFunc.populateFunc)(7, chunk.noise, chunk.side, [3, 3, 4, 10, 12, 10, 7]); // 1: Bush, 2: Tree, 3: Flower, 4: Stone, 5: Worm, 6: Butterfly, 7: Stump

      var entityIds = 0;

      for (var i = 0; i < x.length; i++) {
        for (var j = 0; j < x[i].length; j++) {
          if (!x[i][j]) {
            continue;
          }

          var gridType = chunk.grids[i][j].gridType; // nothing in water

          if (x[i][j] > 0 && gridType == _Constants.GridType.Water) {
            continue;
          } // not on Stone


          if ([1, 2, 3, 6, 7].indexOf(x[i][j]) >= 0 && gridType == _Constants.GridType.Stone) {
            continue;
          }

          var entity = new _models.Entity();
          entity.entityId = entityIds++;
          entity.type = x[i][j] == 1 ? _Constants.EntityType.Bush : x[i][j] == 2 ? _Constants.EntityType.Tree : x[i][j] == 3 ? _Constants.EntityType.Flower : x[i][j] == 4 ? _Constants.EntityType.Stone : x[i][j] == 5 ? _Constants.EntityType.Worm : x[i][j] == 6 ? _Constants.EntityType.Butterfly : _Constants.EntityType.Stump;
          chunk.grids[i][j].appendix = entity;
        }
      }
    }
  }]);
  return GrasslandMapGenerator;
}();

exports.GrasslandMapGenerator = GrasslandMapGenerator;
var grassland = new GrasslandMapGenerator();
exports.grassland = grassland;