"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.desert = exports.DesertMapGenerator = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _generateFunc2 = require("./generateFunc");

var _Grid = require("src/models/Grid");

var _Constants = require("src/Constants");

var _populateFunc = require("./populateFunc");

var _models = require("src/models");

var DesertMapGenerator =
/*#__PURE__*/
function () {
  function DesertMapGenerator() {
    (0, _classCallCheck2.default)(this, DesertMapGenerator);
  }

  (0, _createClass2.default)(DesertMapGenerator, [{
    key: "generate",
    value: function generate(chunk) {
      var _generateFunc = (0, _generateFunc2.generateFunc)(5, chunk.side, 2, 0.05, chunk.noise, [0.7, 0.5, 0.4, 0.3, 0.09, 0.04], [1, 0.5, 0.33, 0.15, 0.6, 0.3]),
          terrain = _generateFunc.terrain,
          gridType = _generateFunc.gridType;

      for (var i = 0; i < chunk.side; i++) {
        for (var j = 0; j < chunk.side; j++) {
          var grid = new _Grid.Grid();
          grid.climate = chunk.climate;
          grid.chunk = chunk;
          var type = gridType[i][j] <= 3 ? _Constants.GridType.Sand : gridType[i][j] <= 4 ? _Constants.GridType.Rock : _Constants.GridType.Stone;

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
      var x = (0, _populateFunc.populateFunc)(5, chunk.noise, chunk.side, [4, 6, 4, 10, 12]); // 1: SandStatue, 2: Cactus, 3: DryGrass, 4: Tent, 5: Sanke

      var entityIds = 0;

      for (var i = 0; i < x.length; i++) {
        for (var j = 0; j < x[i].length; j++) {
          if (!x[i][j]) {
            continue;
          }

          var gridType = chunk.grids[i][j].gridType; // nothing in water

          if (x[i][j] > 0 && gridType == _Constants.GridType.Water) {
            continue;
          } // SandStatue, Cactus, DryGrass not on Stone


          if ((x[i][j] == 1 || x[i][j] == 2 || x[i][j] == 3) && gridType == _Constants.GridType.Stone) {
            continue;
          }

          var entity = new _models.Entity();
          entity.entityId = entityIds++;
          entity.type = x[i][j] == 1 ? _Constants.EntityType.SandStatue : x[i][j] == 2 ? _Constants.EntityType.Cactus : x[i][j] == 3 ? _Constants.EntityType.DryGrass : x[i][j] == 4 ? _Constants.EntityType.Tent : _Constants.EntityType.Snake;
          chunk.grids[i][j].appendix = entity;
        }
      }
    }
  }]);
  return DesertMapGenerator;
}();

exports.DesertMapGenerator = DesertMapGenerator;
var desert = new DesertMapGenerator();
exports.desert = desert;