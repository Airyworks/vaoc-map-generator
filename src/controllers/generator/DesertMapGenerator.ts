import { BaseMapGenerator, intToGridType } from './BaseMapGenerator'
import { generateFunc } from './generateFunc'
import { Chunk } from '@/models/Chunk'
import { Grid } from '@/models/Grid'
import { Climate, GridType, EntityType } from '@/models/Constants'
import { populateFunc } from '@/controllers/generator/populateFunc';
import { Entity } from '@/models';

export class DesertMapGenerator implements BaseMapGenerator {  
  public generate(chunk: Chunk): void {
    const { terrain, gridType } = generateFunc(
      5,
      chunk.side,
      2,
      0.05,
      chunk.noise,
      [0.7, 0.5, 0.4, 0.3, 0.09, 0.04],
      [1, 0.5, 0.33, 0.15, 0.6, 0.3],
    )
    for (let i = 0; i < chunk.side; i++) {
      for (let j = 0; j < chunk.side; j++) {
        const grid = new Grid()
        grid.climate = chunk.climate
        grid.chunk = chunk

        let type: GridType = gridType[i][j] <= 3 ? GridType.Sand : 
                               gridType[i][j] <= 4 ? GridType.Rock :
                               GridType.Stone
        if (terrain[i][j] < 0) {     // is water
          type = GridType.Water
        }
        grid.gridType = type

        grid.terrain = terrain[i][j]
        grid.x = i
        grid.y = j
        if (chunk.grids[i] === undefined) {
          chunk.grids[i] = []
        }
        chunk.grids[i][j] = grid
      }
    }
  }

  public populate(chunk: Chunk): void {
    const x = populateFunc(5, chunk.noise, chunk.side, [4, 6, 4, 10, 12])
    // 1: SandStatue, 2: Cactus, 3: DryGrass, 4: Tent, 5: Sanke
    let entityIds = 0
    for (let i = 0; i < x.length; i++) {
      for (let j = 0; j < x[i].length; j++) {
        if (!x[i][j]) {
          continue
        }
        const gridType = chunk.grids[i][j].gridType
        // nothing in water
        if (x[i][j] > 0 && gridType == GridType.Water) {
          continue
        }
        // SandStatue, Cactus, DryGrass not on Stone
        if ((x[i][j] == 1 || x[i][j] == 2 || x[i][j] == 3) && gridType == GridType.Stone) {
          continue
        }
        const entity = new Entity()
        entity.entityId = entityIds++
        entity.type = x[i][j] == 1 ? EntityType.SandStatue : x[i][j] == 2 ? EntityType.Cactus :
            x[i][j] == 3 ? EntityType.DryGrass : x[i][j] == 4 ? EntityType.Tent : EntityType.Snake
        chunk.grids[i][j].appendix = entity
      }
    }
  }
}

export const desert = new DesertMapGenerator()