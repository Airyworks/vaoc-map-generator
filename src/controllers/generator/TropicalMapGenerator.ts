import { BaseMapGenerator, intToGridType } from './BaseMapGenerator'
import { generateFunc } from './generateFunc'
import { Chunk } from 'src/models/Chunk'
import { Grid } from 'src/models/Grid'
import { Climate, GridType, EntityType } from 'src/Constants'
import { Entity } from 'src/models'
import { populateFunc } from './populateFunc'

export class TropicalMapGenerator implements BaseMapGenerator {  
  public generate(chunk: Chunk): void {
    const { terrain, gridType } = generateFunc(
      5,
      chunk.side,
      1,
      0.3,
      chunk.noise,
      [1, 0.6, 0.4, 0.2, 0.06, 0.03],
      [1, 0.75, 0.33, 0.33, 0.33, 0.5],
    )
    for (let i = 0; i < chunk.side; i++) {
      for (let j = 0; j < chunk.side; j++) {
        const grid = new Grid()
        grid.climate = chunk.climate
        grid.gridType = intToGridType(gridType[i][j])
        grid.chunk = chunk

        let type: GridType = GridType.Dirt
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
    const x = populateFunc(2, chunk.noise, chunk.side, [1, 4])
    // 1: Tree, 2: Snake
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
        const entity = new Entity()
        entity.entityId = entityIds++
        entity.type = x[i][j] == 1 ? EntityType.Tree : EntityType.Snake
        chunk.grids[i][j].appendix = entity
      }
    }
  }
}

export const tropical = new TropicalMapGenerator()