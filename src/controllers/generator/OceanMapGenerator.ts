import { BaseMapGenerator, intToGridType } from './BaseMapGenerator'
import { generateFunc } from './generateFunc'
import { Chunk } from '@/models/Chunk'
import { Grid } from '@/models/Grid'
import { Climate, GridType, EntityType } from '@/models/Constants'
import { populateFunc } from '@/controllers/generator/populateFunc'
import { Entity } from '@/models'

export class OceanMapGenerator implements BaseMapGenerator {  
  public generate(chunk: Chunk): void {
    const { terrain, gridType } = generateFunc(
      5,
      chunk.side,
      3,
      0.3,
      chunk.noise,
      [1, 1, 0.3, 0.2, 0.2, 0.3],
      [1, 0.75, 0.33, 0.33, 0.33, 0.5],
    )
    for (let i = 0; i < chunk.side; i++) {
      for (let j = 0; j < chunk.side; j++) {
        const grid = new Grid()
        grid.climate = chunk.climate
        grid.gridType = intToGridType(gridType[i][j])
        grid.chunk = chunk

        let type: GridType = GridType.Sand
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
    
    const x = populateFunc(5, chunk.noise, chunk.side, [1, 4, 3, 6, 10])
    // 1: CoconutTree, 2: Shell, 3: Fish, 4: JellyFish, 5: Starfish
    let entityIds = 0
    for (let i = 0; i < x.length; i++) {
      for (let j = 0; j < x[i].length; j++) {
        if (!x[i][j]) {
          continue
        }
        const gridType = chunk.grids[i][j].gridType
        // tree not in water
        if (x[i][j] == 1 && gridType == GridType.Water) {
          continue
        }
        // not on Sand
        if (([2, 3, 4, 5].indexOf(x[i][j]) >= 0) && gridType == GridType.Sand) {
          continue
        }
        const entity = new Entity()
        entity.entityId = entityIds++
        entity.type = x[i][j] == 1 ? EntityType.CoconutTree : x[i][j] == 2 ? EntityType.Shell :
            x[i][j] == 3 ? EntityType.Fish : x[i][j] == 4 ? EntityType.Jellyfish : 
            EntityType.Starfish
        chunk.grids[i][j].appendix = entity
      }
    }
  }
}

export const ocean = new OceanMapGenerator()