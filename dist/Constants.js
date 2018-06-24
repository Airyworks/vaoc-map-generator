"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityType = exports.Surface = exports.GridType = exports.Climate = exports.CHUNK_SIDE = void 0;
var CHUNK_SIDE = 64; // Origin is chunk[0]'s climate

exports.CHUNK_SIDE = CHUNK_SIDE;
var Climate;
exports.Climate = Climate;

(function (Climate) {
  Climate[Climate["Tropical"] = 0] = "Tropical";
  Climate[Climate["Grassland"] = 1] = "Grassland";
  Climate[Climate["Iceland"] = 2] = "Iceland";
  Climate[Climate["Desert"] = 3] = "Desert";
  Climate[Climate["Ocean"] = 4] = "Ocean";
  Climate[Climate["Origin"] = 5] = "Origin";
})(Climate || (exports.Climate = Climate = {}));

var GridType;
exports.GridType = GridType;

(function (GridType) {
  GridType[GridType["Stone"] = 0] = "Stone";
  GridType[GridType["Dirt"] = 1] = "Dirt";
  GridType[GridType["Water"] = 2] = "Water";
  GridType[GridType["Ice"] = 3] = "Ice";
  GridType[GridType["Sand"] = 4] = "Sand";
  GridType[GridType["Rock"] = 5] = "Rock";
  GridType[GridType["Snowland"] = 6] = "Snowland";
})(GridType || (exports.GridType = GridType = {}));

var Surface;
exports.Surface = Surface;

(function (Surface) {
  Surface[Surface["Snow"] = 0] = "Snow";
  Surface[Surface["Water"] = 1] = "Water";
  Surface[Surface["Stone"] = 2] = "Stone";
  Surface[Surface["Grass"] = 3] = "Grass";
  Surface[Surface["Cobble"] = 4] = "Cobble";
  Surface[Surface["Ice"] = 5] = "Ice";
  Surface[Surface["Lava"] = 6] = "Lava";
  Surface[Surface["Sand"] = 7] = "Sand";
})(Surface || (exports.Surface = Surface = {}));

var EntityType;
exports.EntityType = EntityType;

(function (EntityType) {
  EntityType[EntityType["Tree"] = 0] = "Tree";
  EntityType[EntityType["Bush"] = 1] = "Bush";
  EntityType[EntityType["Hole"] = 2] = "Hole";
  EntityType[EntityType["Stone"] = 3] = "Stone";
  EntityType[EntityType["Butterfly"] = 4] = "Butterfly";
  EntityType[EntityType["Worm"] = 5] = "Worm";
  EntityType[EntityType["Snake"] = 6] = "Snake";
  EntityType[EntityType["SandStatue"] = 7] = "SandStatue";
  EntityType[EntityType["Cactus"] = 8] = "Cactus";
  EntityType[EntityType["DryGrass"] = 9] = "DryGrass";
  EntityType[EntityType["Tent"] = 10] = "Tent";
  EntityType[EntityType["Flower"] = 11] = "Flower";
  EntityType[EntityType["Stump"] = 12] = "Stump";
  EntityType[EntityType["CoconutTree"] = 13] = "CoconutTree";
  EntityType[EntityType["Shell"] = 14] = "Shell";
  EntityType[EntityType["Fish"] = 15] = "Fish";
  EntityType[EntityType["Jellyfish"] = 16] = "Jellyfish";
  EntityType[EntityType["Starfish"] = 17] = "Starfish";
  EntityType[EntityType["SnowHouse"] = 18] = "SnowHouse";
  EntityType[EntityType["BrokenBoard"] = 19] = "BrokenBoard";
})(EntityType || (exports.EntityType = EntityType = {}));