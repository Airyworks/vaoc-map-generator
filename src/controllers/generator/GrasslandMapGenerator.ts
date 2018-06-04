import { BaseMapGenerator, intToGridType } from './BaseMapGenerator'
import { generateFunc } from './generateFunc'
import { Chunk } from '@/models/Chunk'
import { Grid } from '@/models/Grid'
import { Climate, GridType, EntityType } from '@/models/Constants'
import { populateFunc } from '@/controllers/generator/populateFunc';
import { Entity } from '@/models';

export class GrasslandMapGenerator implements BaseMapGenerator {  
  public generate(chunk: Chunk): void {
    const { terrain, gridType } = generateFunc(
      5,
      chunk.side,
      0.3,
      0.62,
      chunk.noise,
      [1, 0.6, 0.3, 0.2, 0.06, 0.03],
      [1, 0.75, 0.33, 0.33, 0.33, 0.5],
    )
    for (let i = 0; i < chunk.side; i++) {
      for (let j = 0; j < chunk.side; j++) {
        const grid = new Grid()
        grid.climate = chunk.climate
        grid.gridType = intToGridType(gridType[i][j])
        grid.chunk = chunk

        let type: GridType = gridType[i][j] <= 4 ? GridType.Dirt : 
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
    const x = populateFunc(7, chunk.noise, chunk.side, [3, 3, 4, 10, 12, 10, 7])
    // 1: Bush, 2: Tree, 3: Flower, 4: Stone, 5: Worm, 6: Butterfly, 7: Stump
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
        // not on Stone
        if (([1, 2, 3, 6, 7].indexOf(x[i][j]) >= 0) && gridType == GridType.Stone) {
          continue
        }
        const entity = new Entity()
        entity.entityId = entityIds++
        entity.type = x[i][j] == 1 ? EntityType.Bush : x[i][j] == 2 ? EntityType.Tree :
            x[i][j] == 3 ? EntityType.Flower : x[i][j] == 4 ? EntityType.Stone : 
            x[i][j] == 5 ? EntityType.Worm : x[i][j] == 6 ? EntityType.Butterfly : EntityType.Stump
        chunk.grids[i][j].appendix = entity
      }
    }
  }
}

export const grassland = new GrasslandMapGenerator()