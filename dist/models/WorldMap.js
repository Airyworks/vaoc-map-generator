"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.world = exports.WorldMap = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Chunk = require("./Chunk");

var _Constants = require("../Constants");

var moveIter = [1, 0];

var turn = function turn() {
  var t = moveIter[0] * 2 + moveIter[1];

  switch (t) {
    case 2:
      // [1, 0]
      moveIter = [0, -1];
      break;

    case 1:
      // [0, 1]
      moveIter = [1, 0];
      break;

    case -1:
      // [0, -1]
      moveIter = [-1, 0];
      break;

    case -2:
      // [-1, 0]
      moveIter = [0, 1];
      break;

    default:
      throw new Error("moveIter:".concat(moveIter, " is invalid"));
  }
};

var WorldMap =
/*#__PURE__*/
function () {
  (0, _createClass2.default)(WorldMap, null, [{
    key: "randomClimate",
    value: function randomClimate(hash) {
      var seed = parseInt(hash.slice(-2), 16);
      var target = seed % 5;

      var c = _Constants.Climate[target.toString()];

      c = _Constants.Climate[c];
      return c;
    }
  }, {
    key: "calculatePosition",
    value:
    /*#__PURE__*/
    _regenerator.default.mark(function calculatePosition() {
      var n,
          side,
          times,
          pos,
          turned,
          it,
          _args = arguments;
      return _regenerator.default.wrap(function calculatePosition$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              n = _args.length > 0 && _args[0] !== undefined ? _args[0] : 0;
              side = 1;
              times = 0;
              pos = [0, 0];
              turned = 0;
              it = 0;

            case 6:
              if (!(it >= n)) {
                _context.next = 9;
                break;
              }

              _context.next = 9;
              return {
                x: pos[0],
                y: pos[1]
              };

            case 9:
              pos[0] += moveIter[0];
              pos[1] += moveIter[1];
              turned++;

              if (turned >= side) {
                turn();
                turned = 0;
                times++;
              }

              if (times > 1) {
                times = 0;
                side++;
              }

            case 14:
              it++;
              _context.next = 6;
              break;

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, calculatePosition, this);
    })
  }]);

  function WorldMap(side) {
    (0, _classCallCheck2.default)(this, WorldMap);
    (0, _defineProperty2.default)(this, "side", void 0);
    (0, _defineProperty2.default)(this, "hashes", []);
    (0, _defineProperty2.default)(this, "chunks", []);
    (0, _defineProperty2.default)(this, "position", []);
    this.side = side;
  }

  (0, _createClass2.default)(WorldMap, [{
    key: "loadBlockHash",
    value: function loadBlockHash(hashes) {
      this.hashes = hashes;
    }
  }, {
    key: "generateChunks",
    value: function generateChunks() {
      this.generateFirstChunk();
      var posGen = WorldMap.calculatePosition(1);

      for (var i = 1; i < this.hashes.length + 1; i++) {
        var pos = posGen.next().value;
        var chunk = new _Chunk.Chunk(i, this.side, this.hashes[i - 1]);
        chunk.x = pos.x;
        chunk.y = pos.y;
        chunk.climate = WorldMap.randomClimate(chunk.noise.toString());
        this.chunks[i] = chunk;

        if (this.position[pos.x] === undefined) {
          this.position[pos.x] = [];
        }

        this.position[pos.x][pos.y] = chunk;
      }
    }
  }, {
    key: "addChunk",
    value: function addChunk(hash) {
      this.hashes.push(hash);
      var n = this.hashes.length;
      var posGen = WorldMap.calculatePosition(n);
      var pos = posGen.next().value;
      var chunk = new _Chunk.Chunk(n, this.side, this.hashes[n - 1]);
      chunk.x = pos.x;
      chunk.y = pos.y;
      chunk.climate = WorldMap.randomClimate(chunk.noise.toString());
      this.chunks[n] = chunk;

      if (this.position[pos.x] === undefined) {
        this.position[pos.x] = [];
      }

      this.position[pos.x][pos.y] = chunk;
    }
  }, {
    key: "generateFirstChunk",
    value: function generateFirstChunk() {
      var chunk = new _Chunk.Chunk(0, this.side, '0');
      chunk.x = 0;
      chunk.y = 0;
      chunk.climate = _Constants.Climate.Origin;
      this.chunks[0] = chunk;

      if (this.position[0] === undefined) {
        this.position[0] = [];
      }

      this.position[0][0] = chunk;
    }
  }]);
  return WorldMap;
}();

exports.WorldMap = WorldMap;
var world = new WorldMap(_Constants.CHUNK_SIDE);
exports.world = world;