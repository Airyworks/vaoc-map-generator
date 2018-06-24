"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateFunc = generateFunc;

var _simplexNoise = _interopRequireDefault(require("simplex-noise"));

function classifierTerrain(input) {
  if (input > 0.45) {
    return 2;
  }

  if (input > 0.3) {
    return 1;
  }

  if (input < 0) {
    return -1;
  }

  return 0;
} // TODO: replace 7 to GridType.length


function classifierGridType(input) {
  return Math.floor(7 * input);
}

function generateFunc(vecLength, side, exp, bias, noise, weightTerrain, weightGridType) {
  noise = noise.toString();
  var reverse = noise.split('').reverse().join('');
  var width = side;
  var height = side;

  function noiseGen(n) {
    return function (x, y) {
      return n.noise2D(x, y) / 2 + 0.5;
    };
  }

  var _ref = [noiseGen(new _simplexNoise.default(noise)), noiseGen(new _simplexNoise.default(reverse))],
      noise1 = _ref[0],
      noise2 = _ref[1];
  var MatrixT = [];
  var MatrixB = [];

  for (var y = 0; y < height; y++) {
    MatrixT[y] = [];
    MatrixB[y] = [];

    for (var x = 0; x < width; x++) {
      var nx = x / width - 0.5;
      var ny = y / height - 0.5;
      var terrain = 0;
      var gridType = 0;

      for (var i = 0; i < vecLength; i++) {
        terrain += weightTerrain[i] * noise1(nx * (1 << i), ny * (1 << i));
        gridType += weightGridType[i] * noise2(nx * (1 << i), ny * (1 << i));
      }

      terrain /= weightTerrain.slice(0, vecLength).reduce(function (t, e) {
        return t + e;
      });
      terrain = Math.pow(terrain, exp) - bias;
      gridType /= weightGridType.slice(0, vecLength).reduce(function (t, e) {
        return t + e;
      });
      MatrixT[y][x] = classifierTerrain(terrain);
      MatrixB[y][x] = classifierGridType(gridType);
    }
  }

  return {
    terrain: MatrixT,
    gridType: MatrixB
  };
}