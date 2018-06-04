import { BaseMapGenerator, intToGridType } from './BaseMapGenerator'
import { generateFunc } from './generateFunc'
import { Chunk } from '@/models/Chunk'
import { Grid } from '@/models/Grid'
import { Climate, GridType, EntityType } from '@/models/Constants'
import { populateFunc } from '@/controllers/generator/populateFunc'
import { Entity } from '@/models'

export class IcelandMapGenerator implements BaseMapGenerator {  
  public generate(chunk: Chunk): void {
    const { terrain, gridType } = generateFunc(
      5,
      chunk.side,
      3,
      0.05,
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

        let type: GridType = gridType[i][j] <= 4 ? GridType.Snowland : 
                               GridType.Stone
        if (terrain[i][j] < 0) {     // is water
          type = GridType.Ice
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
    
    const x = populateFunc(2, chunk.noise, chunk.side, [16, 12])
    // 1: SnowHouse, 2: BrokenBoard
    let entityIds = 0
    for (let i = 0; i < x.length; i++) {
      for (let j = 0; j < x[i].length; j++) {
        if (!x[i][j]) {
          continue
        }
        const gridType = chunk.grids[i][j].gridType
        // nothing in water
        if (x[i][j] > 0 && gridType == GridType.Ice) {
          continue
        }

        const entity = new Entity()
        entity.entityId = entityIds++
        entity.type = x[i][j] == 1 ? EntityType.SnowHouse : EntityType.BrokenBoard 
        chunk.grids[i][j].appendix = entity
      }
    }
  }
}

export const iceland = new IcelandMapGenerator()