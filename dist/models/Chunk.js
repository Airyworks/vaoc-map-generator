"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chunk = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Constants = require("src/Constants");

var _controllers = require("src/controllers");

var Chunk =
/*#__PURE__*/
function () {
  function Chunk(id, side, noise) {
    (0, _classCallCheck2.default)(this, Chunk);
    (0, _defineProperty2.default)(this, "noise", void 0);
    (0, _defineProperty2.default)(this, "id", void 0);
    (0, _defineProperty2.default)(this, "x", void 0);
    (0, _defineProperty2.default)(this, "y", void 0);
    (0, _defineProperty2.default)(this, "side", void 0);
    (0, _defineProperty2.default)(this, "grids", []);
    (0, _defineProperty2.default)(this, "climate", void 0);
    (0, _defineProperty2.default)(this, "isPreserved", false);
    this.id = id;
    this.side = side;
    this.noise = noise;
  }

  (0, _createClass2.default)(Chunk, [{
    key: "loadGrids",
    value: function loadGrids() {
      var mapGen;

      switch (this.climate) {
        case _Constants.Climate.Desert:
          mapGen = _controllers.MapGenerator.desert;
          break;

        case _Constants.Climate.Grassland:
          mapGen = _controllers.MapGenerator.grassland;
          break;

        case _Constants.Climate.Iceland:
          mapGen = _controllers.MapGenerator.iceland;
          break;

        case _Constants.Climate.Ocean:
          mapGen = _controllers.MapGenerator.ocean;
          break;

        case _Constants.Climate.Origin:
          mapGen = _controllers.MapGenerator.origin;
          break;

        case _Constants.Climate.Tropical:
          mapGen = _controllers.MapGenerator.tropical;
          break;

        default:
          throw new Error("Climate ".concat(this.climate, " is invalid"));
      }

      mapGen.generate(this);
      mapGen.populate(this);
      this.isPreserved = true;
    }
  }, {
    key: "releaseGrids",
    value: function releaseGrids() {
      if (this.isPreserved) {
        var grids = [];
        this.grids = grids;
        this.isPreserved = false;
      }
    }
  }]);
  return Chunk;
}();

exports.Chunk = Chunk;