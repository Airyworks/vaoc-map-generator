"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.populateFunc = populateFunc;

var _simplexNoise = _interopRequireDefault(require("simplex-noise"));

function populateFunc(len, noise, side, R) {
  var weight = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [1, 0.75, 0.3, 0.15, 0.06];
  noise = noise.toString();
  var width = side;
  var height = side;

  function noiseGen(n) {
    return function (x, y) {
      return n.noise2D(x, y) / 2 + 0.5;
    };
  }

  var Matrix = [];

  for (var i = 0; i < len; i++) {
    var noiseG = noiseGen(new _simplexNoise.default(noise + i.toString()));
    var value = [];

    for (var y = 0; y < height; y++) {
      value[y] = [];

      for (var x = 0; x < width; x++) {
        var nx = x / width - 0.5;
        var ny = y / height - 0.5;
        var t = 0;

        for (var _ = 0; _ < weight.length; _++) {
          t += weight[_] * noiseG(nx * (1 << _), ny * (1 << _));
        }

        t /= weight.reduce(function (p, e) {
          return p + e;
        });
        value[y][x] = t;
      }
    }

    for (var yc = 0; yc < height; yc++) {
      for (var xc = 0; xc < width; xc++) {
        var max = 0; // there are more efficient algorithms than this

        for (var yn = Math.max(yc - R[i], 0); yn <= Math.min(yc + R[i], height - 1); yn++) {
          for (var xn = Math.max(xc - R[i], 0); xn <= Math.min(xc + R[i], width - 1); xn++) {
            var e = value[yn][xn];

            if (e > max) {
              max = e;
            }
          }
        }

        if (Matrix[yc] === undefined) {
          Matrix[yc] = [];
        }

        if (value[yc][xc] === max) {
          Matrix[yc][xc] = i + 1;
        } else if (Matrix[yc][xc] === undefined) {
          Matrix[yc][xc] = 0;
        }
      }
    }
  }

  return Matrix;
}